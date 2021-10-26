import { useFilePicker } from "use-file-picker";
import React, { useEffect } from "react";

export default function ImageFilePicker() {
  const [openFileSelector, { filesContent, loading, errors }] = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: true,
    limitFilesConfig: { max: 2 },
    // minFileSize: 1,
    maxFileSize: 50 // in megabytes
  });

  useEffect(() => {
    openFileSelector()
  }, [])

  if (loading) {
    return <div>Loading...</div>;
  }

  if (errors.length) {
    return <div>Error...</div>;
  }

  return (
    <div>
      {filesContent.map((file, index) => (
        <div key={index}>
          <img
            alt={file.name}
            src={file.content}></img>
          <br />
        </div>
      ))}
    </div>
  );
}
