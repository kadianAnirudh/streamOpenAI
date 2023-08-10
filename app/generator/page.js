"use client";

import React, { useState, useRef } from "react";
import { Input } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import SamPicture from "../images/sam.png";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Follow from "../images/Follow.png";
import Feedback from "../images/Feedback.png";
import Share from "../images/Share.png";
import Office from "../images/office.png";
import Image from "next/image";

const page = () => {
  // state for cover Image
  const [previewImage, setPreviewImage] = useState(SamPicture);
  // state for Last page Image
  const [lastImage, setLastImage] = useState(SamPicture);
  // state for hook
  const [hook, sethook] = useState("This space is reserved for a heading");
  //state for Page 1 Title
  const [OneTitle, SetOneTitle] = useState("1. Follow!");
  //state for Page 1 Body
  const [OneBody, SetOneBody] = useState("Body text here");
  // state for hook
  const [lastHeading, setLastHeading] = useState("Enjoy this carousel?");
  //state for Page 1 Body
  const [lastBody, SetLastBody] = useState("Body text here");
  //state for Page 1 Title
  const [OneImage, setOneImage] = useState(Follow);
  //Page number
  // array of pages between page 1 and last page
  const [pages, Setpages] = useState([
    {
      title: "2. Feedback",
      bodyText: "Body Text here",
      imageSource: Feedback,
    },
    {
      title: "3. Spread the word",
      bodyText: "your text here",
      imageSource: Share,
    },
  ]);

  // margin left for preview
  const randomNumber = 600;
  const divRef = useRef(null);

  // parameter is div
  const downloadPDF = async (div) => {
    // jsPDF library prepares a plain page
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [400, 500],
    });

    // each page is actually a div child and has a for loop to create as many canvas as the children
    const pages = div.children;

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const canvas = await html2canvas(page, {
        scale: window.devicePixelRatio * 4,
        useCORS: true,
        allowTaint: true,
      });

      // Convert canvas to JPEG data URL
      // CORS was true because we deal with URL here
      const ImageData = canvas.toDataURL("image/jpeg", 0.7);

      // Add the JPEG image to the PDF
      doc.addImage(ImageData, "JPEG", 0, 0, 400, 500, null, "FAST");
      if (i < pages.length - 1) {
        doc.addPage();
      }
    }
    doc.save("cortes.pdf");
  };

  function previewImageFunction(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = function () {
        setPreviewImage(reader.result);
      };
      // Since the file is saved as a URL, CORS will be applied
      reader.readAsDataURL(file);
    }
  }
  //Image function for Page 1
  function previewImageFunctionOnePage(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = function () {
        setOneImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }
  //Image function for Last Page
  function changeLastImageFunction(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = function () {
        setLastImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }
  //Change image for carousel pages
  function changeImageFunction(event, index) {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = function () {
        // pages is array of carousel pages
        const updatedPages = [...pages];
        updatedPages[index] = {
          ...updatedPages[index],
          imageSource: reader.result,
        };
        Setpages(updatedPages);
      };
      reader.readAsDataURL(file);
    }
  }
  // Hook setting for Cover Page
  function handleHook(abc) {
    sethook(abc);
    console.log(hook);
  }
  // Page 1 body setting
  function handleTitleOne(abc) {
    SetOneTitle(abc);
  }
  // Page 1 Body setting
  function handleBodyOne(abc) {
    SetOneBody(abc);
  }
  // pushing new pages to the array of Pages
  function addPage() {
    Setpages([
      ...pages,
      {
        title: "Choose a smart Title",
        bodyText: "The body text should be small but interesting and valuable",
        imageSource: Office,
      },
    ]);
  }

  return (
    <div className="">
      {/* heading text */}
      <header className="w-full flex justify-center items-center flex-col mt-10">
        <h1 className="head_text">
          Deliver Informative Content with
          <br className="max-md:hidden" />
          <span className="orange_gradient"> Stream Carousels </span>
        </h1>
        <h2 className="desc"> Conquer Linkedin with swag </h2>
      </header>

      {/* Cover Page */}
      <div className="bg-white py-8 mt-16">
        <div className="mx-auto max-w-7xl px-2 lg:px-8 ">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pr-8 lg:pt-4">
              <div className="lg:max-w-lg">
                <p className="py-16 text-3xl font-bold tracking-tight text-blue-600 sm:text-4xl">
                  Cover Page
                </p>
                <Input
                  bordered
                  color="Default"
                  labelPlaceholder="Heading ( Hook for the post )"
                  width="100%"
                  maxLength={50}
                  onChange={(e) => handleHook(e.target.value)}
                />
                <div className="mt-8">
                  <h2 className="text-base leading-7 text-black">
                    {" "}
                    Pro Tip💡: Use your own squared image with a removed
                    background{" "}
                  </h2>
                  <form class="flex items-center mt-8">
                    <div class="shrink-0"></div>
                    <label class="block cursor-pointer">
                      <span className="sr-only cursor-pointer">Choose</span>
                      <input
                        type="file"
                        className="block cursor-pointer w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100"
                        accept="image/*"
                        onChange={previewImageFunction}
                      />
                    </label>
                  </form>
                </div>
              </div>
            </div>
            {/* Div containing the carousel page */}
            <div className="flex justify-center align-center">
              {/* The carousel page */}
              <div className="flex-col justify-center h-carouselHeight w-carouselWidth border-2 border-black overflow-hidden">
                {/* The heading / Hook storage box  */}
                <div className="w-full h-[300px] overflow-hidden text-center flex justify-center">
                  {/* The Hook  */}
                  <h1 className="bingo text-5xl w-full leading-relaxed">
                    {hook}
                  </h1>
                </div>
                {/* // The color rectangle and the image container */}
                <div class="relative">
                  {/* // blue banner div */}
                  <div class="h-40 w-[600px] bg-blue-600 mt-28 rotate-17"></div>
                  {/* image contaning div */}
                  <div class="absolute inset-0 flex justify-center items-center">
                    <div class="h-48 w-48 mb-32">
                      <Image
                        src={previewImage}
                        class="h-full w-full"
                        w={300}
                        h={200}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page 1 */}
      <div className="overflow-hidden bg-white py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 ">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pr-8 lg:pt-4">
              <div className="lg:max-w-lg">
                {/* <h2 className="text-base leading-7 text-black"> Mr. Resourceful </h2> */}
                <p className="mb-16 mt-8 text-3xl font-bold tracking-tight text-blue-600 sm:text-4xl">
                  {" "}
                  Page 1{" "}
                </p>
                <Input
                  bordered
                  color="Default"
                  labelPlaceholder="Heading"
                  width="100%"
                  maxLength={40}
                  onChange={(e) => handleTitleOne(e.target.value)}
                />
                <div className="mt-8">
                  <h2 className="text-base leading-7 text-black">
                    {" "}
                    Pro Tip💡: Use a rectangular image ( Length = 2 * Width ){" "}
                  </h2>
                  <form class="flex items-center mt-8">
                    <div class="shrink-0"></div>
                    <label class="block cursor-pointer">
                      <span className="sr-only">Choose</span>
                      <input
                        type="file"
                        onChange={previewImageFunctionOnePage}
                        className="block cursor-pointer w-full mb-16 text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "
                      />
                    </label>
                  </form>
                  <Textarea
                    labelPlaceholder="Body Text"
                    status="default"
                    width="100%"
                    bordered
                    onChange={(e) => handleBodyOne(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {/* carousel page containing div */}
            <div className="flex justify-center align-center">
              {/* carousel page 1 */}
              <div className="h-carouselHeight w-carouselWidth border-2 border-black flex-col justify-center">
                {/* section 1, with text and heading */}
                <div className="max-w-max mt-8 mx-8 border rounded-md">
                  <h1 className="px-2 py-2 bono text-white bg-blue-600 font-medium border rounded-md text-lg">
                    {" "}
                    {OneTitle}{" "}
                  </h1>
                </div>
                <div className="min-h-[150px]">
                  <h2 className="mt-4 mx-8 max-h-max max-w-max text-lg">
                    {OneBody}
                  </h2>
                </div>
                {/* section 2 with image container and image  */}
                <div className="h-[200px] bg-blue-600 mt-4 ml-4 mr-4 flex justify-center items-center">
                  <div className="h-[180px] w-[340px]">
                    <Image
                      src={OneImage}
                      className="h-full w-full"
                      w={300}
                      h={200}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Pages ( with add page button ) */}
      {pages.map((page) => (
        <div className="overflow-hidden bg-white py-8">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 ">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              <div className="lg:pr-8 lg:pt-4">
                <div className="lg:max-w-lg">
                  <p className="mb-16 mt-8 text-3xl font-bold tracking-tight text-blue-600 sm:text-4xl">
                    {" "}
                    Page {pages.indexOf(page) + 2}{" "}
                  </p>
                  <Input
                    bordered
                    color="Default"
                    labelPlaceholder="Heading"
                    width="100%"
                    maxLength={40}
                    onChange={(e) => {
                      const newPages = [...pages];
                      const index = newPages.indexOf(page);
                      newPages[index] = {
                        ...newPages[index],
                        title: e.target.value,
                      };
                      Setpages(newPages);
                    }}
                  />
                  <div className="mt-8">
                    <h2 className="text-base leading-7 text-black">
                      {" "}
                      Pro Tip💡: Use a rectangular image ( Length = 2 * Width )
                    </h2>
                    <form class="flex items-center mt-8">
                      <div class="shrink-0"></div>
                      <label class="block cursor-pointer">
                        <span className="sr-only cursor-pointer">Choose</span>
                        <input
                          type="file"
                          className="block cursor-pointer w-full mb-16 text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                         file:bg-violet-50 file:text-violet-700
                         hover:file:bg-violet-100"
                          onChange={(e) =>
                            changeImageFunction(e, pages.indexOf(page))
                          }
                        />
                      </label>
                    </form>
                    <Textarea
                      labelPlaceholder="Body Text"
                      status="default"
                      width="100%"
                      bordered
                      onChange={(e) => {
                        const newPages = [...pages];
                        const index = newPages.indexOf(page);
                        newPages[index] = {
                          ...newPages[index],
                          bodyText: e.target.value,
                        };
                        Setpages(newPages);
                      }}
                    />
                    <div className="flex justify-center align-center mt-12">
                      <Button onClick={addPage}> Add Page + </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center align-center">
                <div className="flex-col justify-center h-carouselHeight w-carouselWidth border-2 border-black">
                  {/* section 1, with text and heading */}
                  <div className="">
                    <div className="max-w-max mt-8 mx-8 border rounded-md">
                      <h1 className="px-2 py-2 bono text-white bg-blue-600 font-medium border rounded-md text-lg">
                        {page.title}
                      </h1>
                    </div>
                    <div className="min-h-[150px]">
                      <h2 className="mt-4 mx-8 max-h-max max-w-max text-lg">
                        {page.bodyText}
                      </h2>
                    </div>
                  </div>
                  {/* section 2 with image container and image  */}
                  <div className="h-[200px] bg-blue-600 mt-4 ml-4 mr-4 flex justify-center items-center">
                    <div className="h-[180px] w-[340px]">
                      <Image
                        src={page.imageSource}
                        className="h-full w-full"
                        w={300}
                        h={200}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Last Page */}
      <div className="overflow-hidden bg-white py-8">
        <div className="mx-auto max-w-7xl px-2 lg:px-8 ">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pr-8 lg:pt-4">
              <div className="lg:max-w-lg">
                <p className="py-16 text-3xl font-bold tracking-tight text-blue-600 sm:text-4xl">
                  {" "}
                  Last Page{" "}
                </p>
                <Input
                  bordered
                  color="Default"
                  labelPlaceholder="Heading"
                  width="100%"
                  maxLength={40}
                  onChange={(e) => {
                    setLastHeading(e.target.value);
                  }}
                />
                <div className="mt-12">
                  <Textarea
                    labelPlaceholder="Body Text ( include CTA )"
                    status="default"
                    width="100%"
                    bordered
                    onChange={(e) => {
                      SetLastBody(e.target.value);
                    }}
                  />
                </div>
                <div className="mt-12">
                  <h2 className="text-base leading-7 text-black">
                    {" "}
                    Choose Curtain Image ( Squared, background removed ){" "}
                  </h2>
                  <form class="flex items-center mt-8">
                    <div class="shrink-0"></div>
                    <label class="block cursor-pointer">
                      <span className="sr-only cursor-pointer">Choose</span>
                      <input
                        type="file"
                        onChange={changeLastImageFunction}
                        className="block cursor-pointer w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "
                      />
                    </label>
                  </form>
                </div>
              </div>
            </div>
            <div className="flex justify-center align-center">
              <div className="flex-col justify-center h-carouselHeight w-carouselWidth border-2 border-black overflow-hidden">
                <div className="w-full mt-12">
                  <h2 className="text-3xl font-semibold text-blue-600 mx-8">
                    {lastHeading}
                  </h2>
                </div>
                <div className="w-full mt-4">
                  <p className="text-2xl mx-8 min-h-[180px] overflow-hidden font-medium text-black">
                    {lastBody}
                  </p>
                  <div class="relative overflow-hidden">
                    {/* // blue banner div */}
                    <div class="h-40 w-[600px] bg-blue-600 mt-28"></div>
                    {/* image contaning div */}
                    <div class="absolute inset-0 flex justify-center items-center">
                      <div class="h-48 w-48 mb-16 mt-2 ml-[200px]">
                        <Image
                          src={lastImage}
                          class="h-full w-full"
                          w={300}
                          h={200}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview section */}
      <div className="hiddenbg-white py-8 flex-center justify-center mt-12 ">
        <div className="justify-center flex-center">
          <p className="text-3xl font-bold tracking-tight text-blue-600 sm:text-4xl text-center">
            Amazing Work!
          </p>
          <h2 className="text-base leading-7 text-black mt-8 text-center">
            {" "}
            Preview your beautiful carousel{" "}
          </h2>
          <div className="flex items-center justify-center mt-8 overflow-x-auto border border-black">
            <div
              id="myDiv"
              ref={divRef}
              className={`flex justify-center ml-[${randomNumber}px] mr-[8px]`}
            >
              <div className="flex h-carouselHeight w-carouselWidth border-2 border-black mr-2 coverPagePreview">
                {/* Cover Page Preview */}
                <div
                  className={`h-full w-full overflow-hidden previewCoverStyle`}
                >
                  {/* The heading / Hook storage box  */}
                  <div className="w-full h-2/4 mt-8 overflow-hidden text-center baka">
                    {/* The Hook  */}
                    <h1 className="bingo text-5xl w-full leading-relaxed">
                      {hook}
                    </h1>
                  </div>
                  {/* // The color rectangle and the image container */}

                  <div class="relative">
                    {/* // blue banner div */}
                    <div class="h-40 w-[600px] bg-blue-600 mt-28 rotate-17"></div>
                    {/* image contaning div */}
                    <div class="absolute inset-0 flex justify-center items-center">
                      <div class="h-48 w-48 mb-32 coverImagePreview">
                        <Image
                          src={previewImage}
                          class="h-full w-full"
                          w={300}
                          h={200}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Page 1 Preview  */}
              <div
                style={{ overflow: "hidden" }}
                className="flex h-carouselHeight w-carouselWidth border-2 border-black mr-2 "
              >
                <div className={`h-full w-full overflow-hidden`}>
                  {/* section 1, with text and heading */}
                  <div className="max-w-max mt-8 mx-8 border rounded-md">
                    <h1 className="px-2 py-2 bono text-white bg-blue-600 font-medium border rounded-md text-lg">
                      {" "}
                      {OneTitle}{" "}
                    </h1>
                  </div>
                  <div className="min-h-[150px]">
                    <h2 className="mt-4 mx-8 max-h-max max-w-max text-lg">
                      {OneBody}
                    </h2>
                  </div>

                  {/* section 2 with image container and image  */}
                  <div className="h-[200px] bg-blue-600 mt-4 ml-4 mr-4 flex justify-center items-center">
                    <div className="h-[180px] w-[340px]">
                      <Image src={OneImage} className="h-full w-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Carousel Pages Preview */}
              {pages.map((page) => (
                <div className="flex-col h-carouselHeight w-carouselWidth border-2 border-black mr-2">
                  {/* section 1, with text and heading */}
                  <div className="flex-col justify-center align-center">
                    <div className="">
                      <div className="max-w-max mt-8 mx-8 border rounded-md">
                        <h1 className="px-2 py-2 bono text-white bg-blue-600 font-medium border rounded-md text-lg">
                          {page.title}
                        </h1>
                      </div>
                      <div className="min-h-[150px]">
                        <h2 className="mt-4 mx-8 max-h-max max-w-max text-lg">
                          {page.bodyText}
                        </h2>
                      </div>
                    </div>
                    {/* section 2 with image container and image  */}
                    <div className="h-[200px] bg-blue-600 mt-4 ml-4 mr-4 flex justify-center items-center">
                      <div className="h-[180px] w-[340px]">
                        <Image
                          src={page.imageSource}
                          className="h-full w-full"
                          w={300}
                          h={200}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Last Page Preview */}
              <div className="flex h-carouselHeight w-carouselWidth border-2 border-black mr-2 overflow-hidden">
                <div className="flex-col justify-center h-carouselHeight w-carouselWidth overflow-hidden">
                  <div className="w-full mt-12">
                    <h2 className="text-3xl font-semibold text-blue-600 mx-8">
                      {lastHeading}
                    </h2>
                  </div>
                  <div className="w-full mt-4">
                    <p className="text-2xl mx-8 min-h-[180px] font-medium text-black">
                      {lastBody}
                    </p>
                    <div class="relative overflow-hidden">
                      {/* // blue banner div */}
                      <div class="h-40 w-[600px] bg-blue-600 mt-28"></div>
                      {/* image contaning div */}
                      <div class="absolute inset-0 flex justify-center items-center">
                        <div class="h-48 w-48 mb-16 mt-16 ml-[200px]">
                          <Image
                            src={lastImage}
                            class="h-full w-full"
                            w={300}
                            h={200}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <Button className="" onPress={() => downloadPDF(divRef.current)}>
            {" "}
            Download for Free{" "}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
