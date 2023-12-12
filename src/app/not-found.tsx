import React from 'react';
import {NextPage} from "next";
import Link from "next/link";

const NotFound: NextPage = () => {
  return (
    <div>
      <div>존재하지 않는 페이지입니다.</div>
      <Link href="/search">검색</Link>
    </div>
  );
};

export default NotFound;
