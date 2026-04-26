import { createBrowserRouter, Navigate } from "react-router-dom";
import { SiteLayout } from "./shell/SiteLayout";
import { ChapterRoute } from "../routes/chapters/ChapterRoute";
import { chapterRegistry } from "../routes/chapters/chapter-config";
import { ContactPage } from "../routes/contact/ContactPage";
import { HomePage } from "../routes/home/HomePage";
import { ManifestoPage } from "../routes/manifesto/ManifestoPage";
import { NotFoundPage } from "../routes/not-found/NotFoundPage";
import { SectionLandingPage } from "../routes/sections/SectionLandingPage";

const farLoneSails = chapterRegistry.farLoneSails;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SiteLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "reviews",
        element: (
          <SectionLandingPage
            title="Reviews"
            description="Entry point for review chapters."
            color="#f97316"
            ctaLabel="Read FAR: Lone Sails chapter"
            ctaTo={`${farLoneSails.basePath}/${farLoneSails.pages[0].slug}`}
          />
        )
      },
      {
        path: "features",
        element: (
          <SectionLandingPage
            title="Features"
            description="Long-form features section placeholder."
            color="#06b6d4"
            ctaLabel="Open Home"
            ctaTo="/"
          />
        )
      },
      {
        path: "interviews",
        element: (
          <SectionLandingPage
            title="Interviews"
            description="Interview section placeholder."
            color="#6366f1"
            ctaLabel="Open Home"
            ctaTo="/"
          />
        )
      },
      {
        path: "reviews/far-lone-sails",
        children: [
          {
            index: true,
            element: (
              <Navigate
                to={`${farLoneSails.basePath}/${farLoneSails.pages[0].slug}`}
                replace
              />
            )
          },
          { path: ":pageSlug", element: <ChapterRoute chapter={farLoneSails} /> }
        ]
      },
      { path: "manifesto", element: <ManifestoPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "*", element: <NotFoundPage /> }
    ]
  }
]);
