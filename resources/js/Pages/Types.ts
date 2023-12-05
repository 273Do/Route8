export interface Auth {
  props: any;
  posts: any;
  user: any;
  auth: any;
  bookmarks: any;
  page_title: string;
  arrow: boolean;
  range: number;
  recommend_post_id:number | string;
}

export interface Post {
  map(arg0: (message: any) => void): unknown;
  auth: any;
  post: any;
  messages: any;
  bookmark: any;
  errors: any;
  id: number;
  title: string;
  body: string;
  is_public: boolean;
  walk_available: boolean;
  bicycle_available: boolean;
  car_available: boolean;
  bus_available: boolean;
  train_available: boolean;
  shinkansen_available: boolean;
  plane_available: boolean;
  ship_available: boolean;
  created_at: any;
  map_url: string;
  users: any;
  user: any;
  vehicle: any;
  situation: any;
  categories: any;
  category: any;
}

export interface TitleBar {
  page: string;
  title: string;
  post_id: number;
  user_id: number;
  edit: boolean;
  arrow: boolean;
  range_value: number;
  bookmark:any;
  recommend_post_id:number | string;
}

import "react";

type LordIconTrigger =
  | "in"
  | "hover"
  | "click"
  | "loop"
  | "loop-on-hover"
  | "morph"
  | "morph-two-way";

type LordIconProps = {
  src?: string;
  state?: string;
  stroke?: string;
  trigger?: LordIconTrigger;
  colors?: string;
  delay?: string | number;
};

type LordIconElement = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> &
  LordIconProps;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "lord-icon": LordIconElement;
    }
  }
}
