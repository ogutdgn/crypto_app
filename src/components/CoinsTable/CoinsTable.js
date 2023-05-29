import React, { useState } from 'react';
import TableHeader from './TableHeader';
import Coins from './Coins';

const CoinsTable = () => {

  const [search, setSearch] = useState("");

  return (
    <div>
        <TableHeader setSearch={setSearch}/>
        <Coins search={search}/>
    </div>
  )
}

export default CoinsTable;