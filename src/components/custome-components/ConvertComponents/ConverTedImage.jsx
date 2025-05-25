import { CircleCheckBig, Download } from "lucide-react";
import React from "react";
import { BsFileEarmarkImage } from "react-icons/bs";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { useSelector } from "react-redux";
import prettyBytes from "pretty-bytes";
import Link from "next/link";
import { useSmallDevice } from "@/hooks/use-small-device";

export default function ConverTedImage() {
  const { convertedImages, format } = useSelector((state) => state.converter);
  const isSmallDevice = useSmallDevice();
  return (
    <div className="max-w-4xl mx-auto space-y-3">
      {convertedImages.map((image) => (
        <Card
          key={image.name}
          className="flex-row sm:px-3 sm:gap-6 gap-2 px-2 py-2 sm:py-3 rounded-lg items-center justify-between"
        >
          <div className="flex items-center">
            <div className="bg-sidebar-accent text-sidebar-accent-foreground p-2 rounded-md mr-2">
              <BsFileEarmarkImage />
            </div>
            <p className="text-sm">
              {isSmallDevice ? `${image.name.slice(0, 10)}...` : image.name}
            </p>
          </div>
          <div className="flex items-center text-accent-foreground">
            <CircleCheckBig className="mr-1 w-4 h-4" />
            <p className="text-xs">Converted</p>
          </div>
          <div className="text-muted-foreground">
            <p className="text-xs">{prettyBytes(image.size)}</p>
          </div>
          <Button variant={"outline"} size={"icon"} className="p-0">
            <Link
              href={image.url}
              download={`${image.name.split(".")[0]}-convertio.${format}`}
            >
              <Download className="w-5 h-5" />
            </Link>
          </Button>
        </Card>
      ))}
    </div>
  );
}
