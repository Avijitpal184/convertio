"use client";
import ConverTedImage from "@/components/custome-components/ConvertComponents/ConverTedImage";
import ConvertingImage from "@/components/custome-components/ConvertComponents/ConvertingImage";
import ImageUpload from "@/components/custome-components/ImageUpload";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { useDispatch, useSelector } from "react-redux";
import UploadedImgArray from "./UploadedConverterImg";
import { Button } from "../../ui/button";
import {
  resetConverter,
  setConvertedImages,
  setFormat,
  setImages,
  setStatus,
} from "@/app/redux/converterSlice";
import { toast } from "sonner";
import { useState } from "react";

export default function ConverterMaincomp() {
  const [fileList, setFileList] = useState([]);
  const dispatch = useDispatch();
  const { images, format, status } = useSelector((state) => state.converter);

  const selectFormat = (value) => {
    dispatch(setFormat(value));
  };

  const handleConvert = async () => {
    if (images.length === 0) return;
    if (!format) {
      toast.error("Please select a format");
      return;
    }

    dispatch(setStatus("converting"));

    const converted = [];

    for (const image of fileList) {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("format", format);

      try {
        const res = await fetch("/api/convert", {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          const blob = await res.blob();
          const url = URL.createObjectURL(blob);

          await new Promise((resolve) => setTimeout(resolve, 1500));

          converted.push({
            name: image.name,
            url,
            type: blob.type,
            size: blob.size,
          });
        } else {
          const errorText = await res.text();
          alert(`Error converting ${image.name}: ${errorText}`);
        }
      } catch (error) {
        toast.error(`Network error for ${image.name}`);
      }
    }
    dispatch(setConvertedImages(converted));
    console.log(converted);
    dispatch(setStatus("converted"));
  };

  return (
    <div>
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-semibold">Image Converter</h1>
        <p className="text-sm sm:text-normal mt-2 sm:mt-4 text-muted-foreground">
          Convert your images for free
        </p>
      </div>

      {images.length === 0 ? (
        <ImageUpload
          onFilesSelected={(metaArray, fileArray) => {
            dispatch(setImages(metaArray));
            setFileList(fileArray);
          }}
        />
      ) : (
        <>
          <div className="flex items-center justify-between mt-14 mb-20 gap-2 sm:flex-row flex-col">
            {format ? (
              <h1 className="text-3xl font-semibold">
                Convert to {format.toUpperCase()}
              </h1>
            ) : (
              <h1 className="text-3xl font-semibold">Convert Image</h1>
            )}

            {status !== "converting" && status !== "converted" && (
              <Button
                variant="outline"
                onClick={handleConvert}
                className="order-1 sm:order-0"
              >
                Convert
              </Button>
            )}

            {status === "converted" && (
              <Button
                variant="outline"
                onClick={() => dispatch(resetConverter())}
              >
                Convert Again
              </Button>
            )}

            <Select value={format} onValueChange={selectFormat}>
              <SelectTrigger className="w-[180px] focus-visible:border-ring focus-visible:ring-0 border border-border dark:border-input">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Formats</SelectLabel>
                  <SelectItem value="jpeg">JPEG</SelectItem>
                  <SelectItem value="png">PNG</SelectItem>
                  <SelectItem value="webp">WEBP</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {status !== "converting" && status !== "converted" ? (
            <UploadedImgArray />
          ) : status === "converting" ? (
            <ConvertingImage />
          ) : (
            <ConverTedImage />
          )}
        </>
      )}
    </div>
  );
}
