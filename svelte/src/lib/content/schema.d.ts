// THIS FILE IS AUTOMATICALLY GENERATED. DO NOT MODIFY IT.

import { Asset, Entry } from "contentful";
import { Document } from "@contentful/rich-text-types";

export interface ICustomScheduleChapterContentFields {
  /** Title */
  title: string;

  /** Location */
  location: ILocation;

  /** Start time */
  startTime: string;
}

/** Content for a chapter in the schedule. When there is no suited schedule entry available use this type to show custom data in schedule chapters. Used for example to group events. */

export interface ICustomScheduleChapterContent
  extends Entry<ICustomScheduleChapterContentFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "customScheduleChapterContent";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IEventTypeFields {
  /** Name */
  name: string;
}

export interface IEventType extends Entry<IEventTypeFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "eventType";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface ILocationFields {
  /** Name */
  name?: string | undefined;

  /** Description */
  description?: Document | undefined;

  /** Coordinates */
  coordinates?: { lat: number; lon: number } | undefined;
}

export interface ILocation extends Entry<ILocationFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "location";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IScheduleChapterFields {
  /** Content */
  content: ICustomScheduleChapterContent | IScheduleEntry;
}

/** Used as highlights for creating overviews of schedules. */

export interface IScheduleChapter extends Entry<IScheduleChapterFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "scheduleChapter";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IScheduleEntryFields {
  /** Title */
  title: string;

  /** Type */
  type: IEventType;

  /** French */
  french: boolean;

  /** Start time */
  startTime: string;

  /** Duration in minutes */
  durationInMinutes: number;

  /** Description */
  description?: Document | undefined;

  /** Speakers */
  speakers?: ISpeaker[] | undefined;

  /** Location */
  location?: ILocation | undefined;

  /** Image */
  image?: Asset | undefined;

  /** Theme */
  theme?: ITheme[] | undefined;

  /** Include in chapter list */
  includeInChapterList: boolean;
}

/** An entry in the schedule */

export interface IScheduleEntry extends Entry<IScheduleEntryFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "scheduleEntry";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface ISpeakerFields {
  /** Name */
  name?: string | undefined;

  /** Biography */
  biography?: Document | undefined;

  /** Profile picture */
  profilePicture?: Asset | undefined;
}

export interface ISpeaker extends Entry<ISpeakerFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "speaker";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IThemeFields {
  /** Name */
  name: string;

  /** Description */
  description?: Document | undefined;
}

export interface ITheme extends Entry<IThemeFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "theme";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export type CONTENT_TYPE =
  | "customScheduleChapterContent"
  | "eventType"
  | "location"
  | "scheduleChapter"
  | "scheduleEntry"
  | "speaker"
  | "theme";

export type LOCALE_CODE = "fr" | "nl-BE";

export type CONTENTFUL_DEFAULT_LOCALE_CODE = "nl-BE";
