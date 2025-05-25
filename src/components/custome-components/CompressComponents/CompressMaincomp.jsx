"use client";
import ImageUpload from "@/components/custome-components/ImageUpload";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  addDownload,
  resetCompression,
  setCompressImages,
  setQuality,
  updateStatus,
} from "@/app/redux/compressSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UploadedCompressImg from "./UploadedCompressImg";
import CompressedResult from "./CompressedResult";
import { LoaderCircle } from "lucide-react";

export default function CompressedMaincomp() {
  const [fileList, setFileList] = useState([]);
  const dispatch = useDispatch();
  const { images, quality, status } = useSelector((state) => state.compress);
  const file = fileList[0];

  const handleConvert = async () => {
    if (!file) return;

    dispatch(updateStatus("compressing"));

    const result = await compressImageToTargetSize(file, Number(quality));
    dispatch(addDownload(result));
    dispatch(updateStatus("done"));

    if (result.warning) {
      alert(
        `Could not reach ${quality}KB. Closest achieved: ${Math.round(
          result.size / 1024
        )}KB`
      );
    }
  };

  return (
    <div>
      <div className="text-center">
        <h1 className=" text-3xl sm:text-4xl font-semibold">Compress Image</h1>
        <p className="text-sm sm:text-normal mt-2 sm:mt-4 text-muted-foreground">
          Compress your images for free
        </p>
      </div>

      {images.length === 0 ? (
        <ImageUpload
          multiple={false}
          onFilesSelected={(metaArray, fileArray) => {
            dispatch(setCompressImages(metaArray));
            setFileList(fileArray);
          }}
        />
      ) : (
        <>
          <div className="flex items-center justify-between mt-14 mb-20 gap-y-4 gap-x-4 sm:flex-row flex-col">
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl  font-semibold">
                Target Size (KB):
              </h1>
              <Input
                className="w-18 text-center text-muted-foreground"
                value={quality}
                onChange={(e) => dispatch(setQuality(Number(e.target.value)))}
              />
            </div>

            {status !== "done" && (
              <Button variant="outline" onClick={handleConvert}>
                Compress
              </Button>
            )}

            {status === "done" && (
              <Button
                variant="outline"
                onClick={() => dispatch(resetCompression())}
              >
                Compress Again
              </Button>
            )}
          </div>
          {status !== "compressing" && status !== "done" && (
            <UploadedCompressImg />
          )}

          {status === "compressing" && (
            <div className="flex items-center gap-2 text-xl text-center justify-center">
              <LoaderCircle className="animate-spin" />
              <p>Compressing...</p>
            </div>
          )}
          {status === "done" && <CompressedResult />}
        </>
      )}
    </div>
  );
}

// ✅ Utility function
async function compressImageToTargetSize(file, targetKB) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = async () => {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");

      let width = img.width;
      let height = img.height;

      let blob;

      while (true) {
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        for (let q = 0.95; q >= 0.1; q -= 0.05) {
          blob = await new Promise((res) =>
            canvas.toBlob(
              res,
              file.type === "image/png" ? "image/png" : "image/jpeg",
              q
            )
          );
          if (blob.size / 1024 <= targetKB) {
            const compressed = {
              name: file.name,
              size: blob.size,
              type: file.type,
              url: URL.createObjectURL(blob),
            };
            return resolve(compressed);
          }
        }

        width *= 0.9;
        height *= 0.9;

        if (width < 100 || height < 100) {
          return resolve({
            name: file.name,
            size: blob.size,
            type: file.type,
            url: URL.createObjectURL(blob),
            warning: true,
          });
        }
      }
    };
  });
}
