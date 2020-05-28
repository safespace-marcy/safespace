import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/userContext";
import { Loader } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Home = () => {
  const { user } = useContext(UserContext);
  const [communities, setCommunities] = useState(null);

  useEffect(() => {
    const getCommunities = async () => {
      if (user) {
        const req = await fetch(`/communitiesByUser/${user.id}`);
        const list = await req.json();
        return list;
      }
    };
    getCommunities().then((list) => {
      setCommunities(list);
    });
  }, [user]);

  return (
    <div>
      {communities != null && user != null ? (
        communities.map((community, i) => {
          return (
            <Link key={i} to={`/news/${community.id}`}>
              <h1>{community.name}</h1>
            </Link>
          );
        })
      ) : (
        <div>
          <Loader
            style={{ display: "flex", alignItems: "center" }}
            indeterminate
            active
          >
            Loading Feed...
          </Loader>
        </div>
      )}
    </div>
  );
};
export default Home;
