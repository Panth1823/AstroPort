import { Buffer } from "node:buffer";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CallbackProps = {
  searchParams?: {
    code?: string;
    error?: string;
  };
};

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

async function exchangeCode(code: string) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI || "http://127.0.0.1:3000/callback";

  if (!clientId || !clientSecret) {
    return {
      error: "Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET in your environment.",
    };
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
    cache: "no-store",
  });

  const payload = (await response.json()) as {
    refresh_token?: string;
    access_token?: string;
    error?: string;
    error_description?: string;
  };

  if (!response.ok) {
    if (payload.error === "invalid_grant") {
      return {
        error:
          "Invalid authorization code. Generate a fresh code, and make sure the redirect URI in Spotify matches SPOTIFY_REDIRECT_URI exactly.",
      };
    }

    return {
      error: payload.error_description || payload.error || "Spotify token exchange failed.",
    };
  }

  return payload;
}

export default async function CallbackPage({ searchParams }: CallbackProps) {
  const code = searchParams?.code;
  const error = searchParams?.error;

  let refreshToken: string | undefined;
  let message: string | undefined;

  if (error) {
    message = error;
  } else if (code) {
    const result = await exchangeCode(code);
    if ("error" in result) {
      message = result.error;
    } else {
      refreshToken = result.refresh_token;
      message = refreshToken
        ? "Copy the refresh token below into the project root .env.local file."
        : "Spotify returned no refresh token. Try the auth flow again with prompt=consent.";
    }
  } else {
    message = "No authorization code was provided.";
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl items-center px-6 py-16">
      <Card className="w-full border-border/70 bg-card/80 shadow-xl backdrop-blur">
        <CardHeader>
          <CardTitle>Spotify callback</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p>{message}</p>

          {refreshToken ? (
            <div className="space-y-2">
              <p className="font-medium text-foreground">Refresh token</p>
              <pre className="overflow-x-auto rounded-xl border border-border/70 bg-background p-4 text-xs text-foreground">
                {refreshToken}
              </pre>
              <p>Paste it into <span className="font-medium text-foreground">.env.local</span> at the project root as <span className="font-medium text-foreground">SPOTIFY_REFRESH_TOKEN</span>.</p>
            </div>
          ) : null}

          <p>
            Then restart the dev server so the now-playing widget can use the new token.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}