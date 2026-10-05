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
      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <h3 className="text-lg font-semibold text-slate-900">
            Website Sessions
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Overview of users accessing the website.
          </p>
        </div>

        <div className="p-6">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">
              Logged-in Users
            </p>

            <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
              4,832
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Active website sessions
            </p>
          </div>
        </div>
      </section>

      {/* App Sessions */}
      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <h3 className="text-lg font-semibold text-slate-900">
            App Sessions
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Sessions across the mobile application.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 p-6 sm:grid-cols-2">
          {appSessions.map((session) => (
            <div
              key={session.name}
              className="rounded-lg border border-slate-200 bg-slate-50 p-4"
            >
              <p className="text-sm font-medium text-slate-600">
                {session.name}
              </p>

              <p className="mt-2 text-xl font-semibold text-slate-900">
                {session.sessions}
              </p>

              <p className="mt-1 text-xs text-slate-400">
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