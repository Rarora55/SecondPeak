import { createBrowserRouter, Navigate } from "react-router-dom";
import { SiteLayout } from "./shell/SiteLayout";
import { ChapterRoute } from "../routes/chapters/ChapterRoute";
import { chapterRegistry } from "../routes/chapters/chapter-config";
import { CalendarPage } from "../routes/calendar/CalendarPage";
import { ContactPage } from "../routes/contact/ContactPage";
import { HomeVersionPage } from "../routes/home/HomeVersionPage";
import { ManifestoPage } from "../routes/manifesto/ManifestoPage";
import { NotFoundPage } from "../routes/not-found/NotFoundPage";
import { SectionArticlePage } from "../routes/sections/SectionArticlePage";
import { SectionLandingPage } from "../routes/sections/SectionLandingPage";

const farLoneSails = chapterRegistry.farLoneSails;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SiteLayout />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      { path: "home", element: <HomeVersionPage /> },
      { path: "home/:versionSlug", element: <HomeVersionPage /> },
      {
        path: "reviews",
        element: (
          <SectionLandingPage
            title="Reviews"
            description="Entry point for review chapters."
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
            ctaLabel="Open Home"
            ctaTo="/"
          />
        )
      },
      { path: "features/:articleSlug", element: <SectionArticlePage section="features" /> },
      {
        path: "interviews",
        element: (
          <SectionLandingPage
            title="Interviews"
            description="Interview section placeholder."
            ctaLabel="Open Home"
            ctaTo="/"
          />
        )
      },
      { path: "interviews/:articleSlug", element: <SectionArticlePage section="interviews" /> },
      {
        path: "calendar",
        element: <CalendarPage />
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
