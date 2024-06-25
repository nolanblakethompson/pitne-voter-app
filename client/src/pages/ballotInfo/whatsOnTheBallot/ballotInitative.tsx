'use client';

import { useState, useEffect } from 'react';
import { localBallotInitiativeAPI } from '@/common';

import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Card, CardContent } from '@mui/material';
import { globalDistrictNum, globalCurrElection } from '@/common';

interface Initiative {
  id: number;
  attributes: {
    District: string;
    InitiativeName: string;
    ProponentEmail: string;
    ElectionName: string;
    ProponentName: string;
    ProponentPhoneNumber: string;
    WhatIsNo: string;
    WhatIsYes: string;
  };
}

interface Init {
  District: string;
  InitiativeName: string;
  ProponentEmail: string;
  ElectionName: string;
  ProponentName: string;
  ProponentPhoneNumber: string;
  WhatIsNo: string;
  WhatIsYes: string;
}

export default function BallotInitiative() {
  const [initiative, setInitiative] = useState<Initiative[]>([]);
  const [districtNum, setDistrictNum] = useState<string | null>(globalDistrictNum);
  const [selectedElection, setSelectedElection] = useState<string | null>(globalCurrElection);
  const [filteredData, setFilteredData] = useState<{ [key: string]: Init[] }>({});

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(localBallotInitiativeAPI, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (res.ok) {
          const data = (await res.json()).data;
          setInitiative(data);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (e) {
        console.error('Error fetching data:', e);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    setDistrictNum(globalDistrictNum);
    setSelectedElection(globalCurrElection);
    console.log(globalDistrictNum, globalCurrElection);

    if (initiative.length > 0 && globalDistrictNum && globalCurrElection) {
      const curData: { [key: string]: Init[] } = {};

      initiative.forEach((item) => {
        const initDistrict = item.attributes.District;
        const initElection = item.attributes.ElectionName;
        if ((initDistrict === globalDistrictNum || initElection === 'All Districts') && initElection === globalCurrElection?.trim()) {
          if (curData[initDistrict]) {
            curData[initDistrict].push(item.attributes);
          } else {
            curData[initDistrict] = [item.attributes];
          }
        }
      });

      console.log(curData);
      setFilteredData(curData);
    }
  }, [globalDistrictNum, globalCurrElection, initiative]);

  useEffect(() => { })

  return (
    <div className="p-4 text-center w-full sm:w-3/4" style={{ paddingLeft: '24px', paddingRight: '24px' }}>
      {Object.keys(filteredData).length > 0 ? (
        Object.entries(filteredData).map(([key, items]) => (
          items.map((item, index) => (
            <Accordion key={`${key}-${index}`} className="bg-white mb-3">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${key}-${index}-content`}
                id={`panel${key}-${index}-header`}
              >
                <Typography className="text-blue-700 text-xl">{item.InitiativeName}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="text-lg">
                  <Typography className="text-lg underline">Proponent&apos;s Contact:</Typography>
                  {item.ProponentName}
                  <br />
                  {item.ProponentEmail}
                  <br />
                  {item.ProponentPhoneNumber}
                  <br />
                </div>
                <Card className="my-8" sx={{ backgroundColor: '#f4f4f4', minWidth: 275 }}>
                  <CardContent>
                    <Typography className="text-xl underline">What is a vote YES?</Typography>
                    <ul className="list-disc list-outside text-lg pr-8 text-left pl-16 py-2">
                      {item.WhatIsYes}
                    </ul>
                  </CardContent>
                </Card>
                <Card className="mt-8 mb-5" sx={{ backgroundColor: '#f4f4f4', minWidth: 275 }}>
                  <CardContent>
                    <Typography className="text-xl underline">What is a vote NO?</Typography>
                    <ul className="list-disc list-outside text-lg pr-8 text-left pl-16 py-2">
                      {item.WhatIsNo}
                    </ul>
                  </CardContent>
                </Card>
              </AccordionDetails>
            </Accordion>
          ))
        ))
      ) : (
        <div>There is no data about the ballot for the district and election you have selected.</div>
      )}
    </div>
  );
}