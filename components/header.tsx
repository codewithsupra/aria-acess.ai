import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";

function AriaLogoMark() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* outer arc */}
      <path
        d="M3.5 11a7.5 7.5 0 1 1 15 0"
        stroke="oklch(0.511 0.232 276.97)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* inner arc */}
      <path
        d="M6.5 11a4.5 4.5 0 1 1 9 0"
        stroke="oklch(0.72 0.14 277)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* center dot */}
      <circle cx="11" cy="11" r="1.5" fill="white" />
    </svg>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#050816]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-10">
        <a
          href="/"
          aria-label="Aria — go to homepage"
          className="flex items-center gap-2 font-heading text-lg text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
        >
          <AriaLogoMark />
          Aria
        </a>

        <div className="flex items-center gap-3">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button
                type="button"
                className="rounded-lg px-4 py-1.5 text-sm font-medium text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              >
                Sign in
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button
                type="button"
                className="rounded-lg bg-white/10 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              >
                Sign up
              </button>
            </SignUpButton>
          </Show>

          <Show when="signed-in">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "size-8",
                },
              }}
            />
          </Show>
        </div>
      </div>
    </header>
  );
}
