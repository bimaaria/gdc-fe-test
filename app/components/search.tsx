interface SearchProps {
  onSearch: () => void;
  onChangeUsername: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validationText: string | null;
}

export default function Search({ onSearch, onChangeUsername, validationText }: SearchProps) {
  return (
    <div className="flex items-center">
      <div className="flex flex-col">
        <input
          type="text"
          name="username"
          className="border border-white rounded-sm px-4 py-2"
          onChange={onChangeUsername}
        />
        {validationText && <p className="text-red-500">{validationText}</p>}
      </div>
      <button
        type="button"
        onClick={onSearch}
        className={`bg-white text-black rounded-sm px-4 py-2 ml-2 ${validationText ? "self-start" : ""}`}
      >
        Search
      </button>
    </div>
  );
}