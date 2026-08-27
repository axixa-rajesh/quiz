import Button from "./Button";

function PageHeader({
  title,
  buttonTitle,
  onClick,
}) {
  return (
    <div className="mb-8 flex flex-col items-start justify-between gap-4 rounded-2xl bg-white p-6 shadow-sm md:flex-row md:items-center">

      <div>

        <h1 className="text-3xl font-bold text-slate-800">
          {title}
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Manage your {title.toLowerCase()} here.
        </p>

      </div>

      {buttonTitle && (

        <Button
          title={buttonTitle}
          onClick={onClick}
        />

      )}

    </div>
  );
}

export default PageHeader;