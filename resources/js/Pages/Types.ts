export interface Auth {
    props: any;
    posts: any;
    auth: any;
}

export interface Post {
    auth: any;
    post: any;
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
    categories: any;
    category: any;
}
