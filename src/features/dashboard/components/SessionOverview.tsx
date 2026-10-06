const appSessions = [
  {
    name: "NEET PG",
    sessions: "2,842",
  },
  {
    name: "NEET SS",
    sessions: "1,924",
  },
  {
    name: "FMGE",
    sessions: "1,482",
  },
  {
    name: "MBBS Curriculum",
    sessions: "2,316",
  },
  {
    name: "PG Residency",
    sessions: "1,128",
  },
];

function SessionOverview() {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      {/* Website Sessions */}
      <section className="group rounded-xl border border-border bg-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md">
        <div className="border-b border-border px-6 py-5">
          <h3 className="text-lg font-semibold text-text-primary">
            Website Sessions
          </h3>

          <p className="mt-1 text-sm text-text-secondary">
            Overview of users accessing the website.
          </p>
        </div>

        <div className="p-6">
          <div
            className="
              relative
              overflow-hidden
              rounded-xl
              bg-primary-light
              p-6
              transition-all duration-300 ease-out
              group-hover:shadow-sm
            "
          >
            <div className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/80 text-primary shadow-sm">
              <span className="text-lg">↗</span>
            </div>

            <p className="text-sm font-medium text-text-secondary">
              Logged-in Users
            </p>

            <p className="mt-3 text-4xl font-semibold tracking-tight text-text-primary">
              4,832
            </p>

            <div className="mt-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" />

              <p className="text-xs font-medium text-text-secondary">
                Active website sessions
              </p>
            </div>

            <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-white/70">
              <div className="h-full w-[72%] rounded-full bg-primary transition-all duration-500 group-hover:w-[78%]" />
            </div>

            <div className="mt-2 flex justify-between text-xs text-text-muted">
              <span>Current activity</span>
              <span>72%</span>
            </div>
          </div>
        </div>
      </section>

      {/* App Sessions */}
      <section className="group rounded-xl border border-border bg-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md">
        <div className="border-b border-border px-6 py-5">
          <h3 className="text-lg font-semibold text-text-primary">
            App Sessions
          </h3>

          <p className="mt-1 text-sm text-text-secondary">
            Sessions across the mobile application.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 p-6 sm:grid-cols-2">
          {appSessions.map((session) => (
            <div
              key={session.name}
              className="
                rounded-lg
                bg-secondary-light
                p-4
                transition-all duration-300 ease-out
                hover:-translate-y-1
                hover:bg-primary-light
                hover:shadow-sm
              "
            >
              <p className="text-sm font-medium text-text-secondary">
                {session.name}
              </p>

              <p className="mt-2 text-xl font-semibold text-text-primary">
                {session.sessions}
              </p>

              <p className="mt-1 text-xs text-text-muted">
                sessions
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default SessionOverview;