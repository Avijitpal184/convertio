// import Image from "next/image";
// import { Input } from "@/components/ui/input";
// import { useRef, useState } from "react";

// export default function ImageUpload({ onFilesSelected}) {
//   const inputRef = useRef(null);
//   const [dragOver, setDragOver] = useState(false);


//   const handleFiles = (files) => {
//     if (files && files.length > 0) {
//       const fileArray = Array.from(files);
//       const metaArray = fileArray.map((file) => ({
//       name: file.name,
//       size: file.size,
//       type: file.type,
//       url: URL.createObjectURL(file),
//     }));

//     onFilesSelected(metaArray, fileArray);
//     }
//   };


//   return (
//     <div className="w-full py-2">
//       <div
//         onClick={() => inputRef.current && inputRef.current.click()}
//         onDragOver={(e) => {
//           e.preventDefault();
//           e.stopPropagation();
//           setDragOver(true);
//         }}
//         onDragLeave={(e) => {
//           e.preventDefault();
//           e.stopPropagation();
//           setDragOver(false);
//         }}
//         onDrop={(e) => {
//           e.preventDefault();
//           e.stopPropagation();
//           setDragOver(false);
//           const files = e.dataTransfer.files;
//           handleFiles(files);
//         }}
//         className={`max-w-3xl mx-auto cursor-pointer border-dashed border-2 mt-10 rounded-2xl border-ring flex items-center justify-center h-[400px] drop-shadow-lg bg-muted ${
//           dragOver ? "!bg-accent" : ""
//         }`}
//       >
//         <div className="flex items-center flex-col gap-2">
//           <Image
//             src={"/assets/upload_image_icon_dark.svg"}
//             width={80}
//             height={80}
//             alt={"upload"}
//           />

//           <span className="text-2xl font-medium">Add Images</span>
//           <span className="text-sm text-muted-foreground">
//             or drag and drop
//           </span>
//         </div>
//         <Input
//           id="picture"
//           multiple
//           type="file"
//           ref={inputRef}
//           accept="image/*"
//           className="hidden"
//           onChange={(e) => handleFiles(e.target.files)}
//         />
//       </div>
//     </div>
//   );
// }






























import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
export default function ImageUpload({ onFilesSelected, multiple = true }) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = (files) => {
    if (files && files.length > 0) {
      // ✅ Enforce single file if multiple is false
      const fileArray = multiple ? Array.from(files) : [files[0]];
      const metaArray = fileArray.map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
      }));

      onFilesSelected(metaArray, fileArray);
    }
  };

  return (
    <div className="w-full py-2">
      <div
        onClick={() => inputRef.current && inputRef.current.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setDragOver(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={`max-w-3xl mx-auto cursor-pointer border-dashed border-2 mt-10 rounded-2xl border-ring flex items-center justify-center h-[400px] drop-shadow-lg bg-muted ${
          dragOver ? "!bg-accent" : ""
        }`}
      >
        <div className="flex items-center flex-col gap-2">
          <Image
            src={"/assets/upload_image_icon_dark.svg"}
            width={80}
            height={80}
            alt={"upload"}
          />
          <span className="text-xl sm:text-2xl font-medium">
            {multiple ? "Add Images" : "Add Image"}
          </span>
          <span className="text-xs sm:text-sm text-muted-foreground">
            or drag and drop
          </span>
        </div>
        <Input
          id="picture"
          type="file"
          ref={inputRef}
          accept="image/*"
          className="hidden"
          multiple={multiple} // ✅ properly use prop here
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
    </div>
  );
}
