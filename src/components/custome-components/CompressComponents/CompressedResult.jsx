import { CircleCheckBig, Download } from "lucide-react";
import React from "react";
import { BsFileEarmarkImage } from "react-icons/bs";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { useSelector } from "react-redux";
import prettyBytes from "pretty-bytes";
import Link from "next/link";
import { useSmallDevice } from "@/hooks/use-small-device";

export default function CompressedResult() {
  const { downloadList } = useSelector((state) => state.compress);
  const isSmallDevice = useSmallDevice();

  if(!downloadList) return null

  return (
    <div className="max-w-4xl mx-auto">
      
        <Card
          key={downloadList.name}
          className="flex-row sm:px-3 sm:gap-6 gap-2 px-2 py-2 sm:py-3 rounded-lg items-center justify-between"
        >
          <div className="flex items-center">
            <div className="bg-sidebar-accent text-sidebar-accent-foreground p-2 rounded-md mr-2">
              <BsFileEarmarkImage />
            </div>
            <p className="text-sm">
              {isSmallDevice ? `${downloadList.name.slice(0, 10)}...` : downloadList.name}
            </p>
          </div>
          <div className="flex items-center text-accent-foreground">
            <CircleCheckBig className="mr-1 w-4 h-4" />
            <p className="text-xs">Done</p>
          </div>
          <div className="text-muted-foreground">
            <p className="text-xs">{prettyBytes(downloadList.size)}</p>
          </div>
          <Button variant={"outline"} size={"icon"} className="p-0">
            <Link
              href={downloadList.url}
              download={`${downloadList.name}`}
            >
              <Download className="w-5 h-5" />
            </Link>
          </Button>
        </Card>
      
    </div>
  );
}
