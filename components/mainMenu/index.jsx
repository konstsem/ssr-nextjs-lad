import React from 'react';
import Link from 'next/link';

export default function () {
  return (
    <div>
      <Link href="/"><a>Main page</a></Link>
      <Link href="/weatherWidget"><a>Weather widget</a></Link>
      <Link href="/aboutMe"><a>About Me</a></Link>
      <style jsx>{`
        a {
          margin: 20px;
        }
        `}
      </style>
    </div>
  );
}
