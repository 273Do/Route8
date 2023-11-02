import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Link } from '@inertiajs/inertia-react';
import { router } from '@inertiajs/react';
import { Auth, Post } from '../Types';
import NavLink from '@/Components/NavLink';
import { LordIcon } from '../Common/lord-icon';
import TitleBar from '../../Layouts/TitleBar';

// IndexPage
const Index = (props: Auth) => {
  const { posts } = props;
  console.log(props);

  const handleDeletePost = (id: number) => {
    router.delete(`/posts/${id}`, {
      onBefore: () => confirm('本当に削除しますか？'),
    });
  };

  const putWeatherState = (weather: string): string => {
    let url: string = '';
    if (weather == 'sunny') url = 'https://cdn.lordicon.com/ingirgpt.json';
    else if (weather == 'cloudy') url = 'https://cdn.lordicon.com/zawvkqfy.json';
    else if (weather == 'rainy') url = 'https://cdn.lordicon.com/jtslwgho.json';
    else if (weather == 'snowy') url = 'https://cdn.lordicon.com/sjtzcwfd.json';
    return url;
  };

  return (
    <Authenticated auth={props.auth} header={<h2>Index</h2>}>
      <div className="main_contents">
        <TitleBar page={'Route'} title={'Route'} edit={false} />
        <div className="route_list">
          {posts.map((post: Post) => (
            <div className="route_board" key={post.id}>
              <Link className="link_no_underline" href={`/posts/${post.id}`}>
                <div className="route_card">
                  <div className="route_header">
                    <p>
                      {post.situation.start_point} → {post.situation.goal_point}
                    </p>
                    <ul>
                      <li className={`${props.auth.user.id == post.user.id ? '' : 'display_none'}`}>
                        <Link href={`/posts/${post.id}/edit`}>
                          <LordIcon
                            src="https://cdn.lordicon.com/uwbjfiwe.json"
                            trigger="hover"
                            colors={{
                              primary: '#f4ede4',
                            }}
                            size={25}
                          />
                        </Link>
                      </li>
                      <li
                        className={`${props.auth.user.id == post.user.id ? '' : 'display_none'}`}
                        onClick={() => handleDeletePost(post.id)}
                      >
                        <LordIcon
                          src="https://cdn.lordicon.com/wpyrrmcq.json"
                          trigger="morph"
                          state="morph-trash-full"
                          colors={{
                            primary: '#f4ede4',
                          }}
                          size={25}
                        />
                      </li>
                      <li>
                        <LordIcon
                          src="https://cdn.lordicon.com/prjooket.json"
                          trigger="morph"
                          state="morph-marked-bookmark"
                          colors={{
                            primary: '#f4ede4',
                          }}
                          size={25}
                        />
                      </li>
                    </ul>
                  </div>
                  <iframe
                    src={post.map_url}
                    width="480"
                    height="260"
                    allowFullScreen
                    loading="lazy"
                    frameborder="0"
                  ></iframe>
                  <div className="route_footer">
                    {post.situation.is_running == 1 ? (
                      <>
                        <ul className="route_weather">
                          {post.category.category_name == 'Facility' ? (
                            <>
                              <li>
                                <LordIcon
                                  src="https://cdn.lordicon.com/pfdotuzr.json"
                                  trigger="hover"
                                  colors={{
                                    primary: '#f4ede4',
                                    secondary: '#f4ede4',
                                  }}
                                  size={25}
                                />
                              </li>
                            </>
                          ) : (
                            <>
                              <li
                                className={`${
                                  post.category.category_name == 'Scenery' ? '' : 'display_none'
                                }`}
                              >
                                <LordIcon
                                  src="https://cdn.lordicon.com/esrfxuri.json"
                                  trigger="hover"
                                  stroke="bold"
                                  colors={{
                                    primary: '#f4ede4',
                                    secondary: '#f4ede4',
                                  }}
                                  size={25}
                                />
                              </li>
                              <li>
                                <LordIcon
                                  src={putWeatherState(post.situation.weather_before_id)}
                                  trigger="hover"
                                  stroke="bold"
                                  colors={{
                                    primary: '#f4ede4',
                                    secondary: '#f4ede4',
                                  }}
                                  size={25}
                                />
                              </li>
                              <li>
                                <LordIcon
                                  src={putWeatherState(post.situation.weather_after_id)}
                                  trigger="hover"
                                  stroke="bold"
                                  colors={{
                                    primary: '#f4ede4',
                                    secondary: '#f4ede4',
                                  }}
                                  size={25}
                                />
                              </li>
                            </>
                          )}
                        </ul>

                        <ul className="route_vehicle">
                          <li
                            className={`${post.vehicle.walk_available == 0 ? 'display_none' : ''}`}
                          >
                            <LordIcon
                              src="https://cdn.lordicon.com/oxbjzlrk.json"
                              trigger="hover"
                              colors={{
                                primary: '#f4ede4',
                                secondary: '#f4ede4',
                              }}
                              size={25}
                            />
                          </li>
                          <li
                            className={`${
                              post.vehicle.bicycle_available == 0 ? 'display_none' : ''
                            }`}
                          >
                            <LordIcon
                              src="https://cdn.lordicon.com/mknljqhi.json"
                              trigger="hover"
                              colors={{
                                primary: '#f4ede4',
                                secondary: '#f4ede4',
                              }}
                              size={25}
                            />
                          </li>
                          <li
                            className={`${post.vehicle.car_available == 0 ? 'display_none' : ''}`}
                          >
                            <LordIcon
                              src="https://cdn.lordicon.com/cqjfxkgf.json"
                              trigger="hover"
                              colors={{
                                primary: '#f4ede4',
                                secondary: '#f4ede4',
                              }}
                              size={25}
                            />
                          </li>
                          <li
                            className={`${post.vehicle.bus_available == 0 ? 'display_none' : ''}`}
                          >
                            <LordIcon
                              src="https://cdn.lordicon.com/yiothpas.json"
                              trigger="hover"
                              colors={{
                                primary: '#f4ede4',
                                secondary: '#f4ede4',
                              }}
                              size={25}
                            />
                          </li>
                          <li
                            className={`${post.vehicle.train_available == 0 ? 'display_none' : ''}`}
                          >
                            <LordIcon
                              src="https://cdn.lordicon.com/eomzkbrc.json"
                              trigger="hover"
                              colors={{
                                primary: '#f4ede4',
                                secondary: '#f4ede4',
                              }}
                              size={25}
                            />
                          </li>
                          <li
                            className={`${
                              post.vehicle.shinkansen_available == 0 ? 'display_none' : ''
                            }`}
                          >
                            <LordIcon
                              src="https://cdn.lordicon.com/dpwabcjy.json"
                              trigger="hover"
                              colors={{
                                primary: '#f4ede4',
                                secondary: '#f4ede4',
                              }}
                              size={25}
                            />
                          </li>
                          <li
                            className={`${post.vehicle.plane_available == 0 ? 'display_none' : ''}`}
                          >
                            <LordIcon
                              src="https://cdn.lordicon.com/rpcdmsys.json"
                              trigger="hover"
                              colors={{
                                primary: '#f4ede4',
                                secondary: '#f4ede4',
                              }}
                              size={25}
                            />
                          </li>
                          <li
                            className={`${post.vehicle.ship_available == 0 ? 'display_none' : ''}`}
                          >
                            <LordIcon
                              src="https://cdn.lordicon.com/pgofwoue.json"
                              trigger="hover"
                              colors={{
                                primary: '#f4ede4',
                                secondary: '#f4ede4',
                              }}
                              size={25}
                            />
                          </li>
                        </ul>
                      </>
                    ) : (
                      <>
                        <ul className="isnot_running">
                          <li>
                            <LordIcon
                              src="https://cdn.lordicon.com/muyjobwf.json"
                              trigger="hover"
                              colors={{
                                primary: '#f4ede4',
                                secondary: '#f4ede4',
                              }}
                              size={25}
                            />
                          </li>
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              </Link>
              <p className="card_title">{post.title}</p>
            </div>
          ))}
        </div>
      </div>
    </Authenticated>
  );
};

export default Index;
