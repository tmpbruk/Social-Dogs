import React from "react";
import { GET_STATS } from "../../api";
import useFetch from "../../Hooks/useFetch";
import Error from "../Helper/Error";
import Head from "../Helper/Head";
import Loading from "../Helper/Loading";
const UserStatsGraphs = React.lazy(() => import("./UserStatsGraphs"));

const UserStats = () => {
  const { data, loading, error, request } = useFetch();
  React.useEffect(() => {
    async function geData() {
      const { url, options } = GET_STATS();
      await request(url, options);
    }
    geData();
  }, [request]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data) {
    return (
      <React.Suspense fallback={<div></div>}>
        <Head title="Estatisticas" />
        <UserStatsGraphs data={data} />
      </React.Suspense>
    );
  } else return null;
};

export default UserStats;
