import { useFilePicker } from "use-file-picker";
import React, { useEffect } from "react";

export default function ImageFilePicker(props) {
  const [openFileSelector, { filesContent, loading, errors }] = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: true,
    limitFilesConfig: { max: 2 },
    // minFileSize: 1,
    maxFileSize: 50 // in megabytes
  });

  useEffect(() => {
    openFileSelector();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (errors.length) {
    return <div>Error...</div>;
  } else {
    filesContent.map((file, index) => {
      let elem = document.createElement("img");
      elem.setAttribute('src', file.content);
      elem.setAttribute("alt", index);
      document.getElementsByClassName("text-editor")[0]
        .appendChild(elem);
      props.handleFilePickerClose();
    });
  }

  return (null);
}
