import { ChangeEvent } from "react";

interface FileInputFieldProps {
  label: string;
  file: string | null;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FileInputField = ({ label, file, onChange }: FileInputFieldProps) => {
  return (
    <div
      style={{
        paddingTop: 15,
        whiteSpace: "wrap",
        textOverflow: "ellipsis",
      }}
    >
      <label style={{ marginRight: 5 }}>{label}</label>
      <input type="file" onChange={onChange} />
      {file && <p style={{ marginLeft: 5 }}>Archivo seleccionado</p>}
    </div>
  );
};

export default FileInputField;
