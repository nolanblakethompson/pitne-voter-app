import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid, Button, Card, CardContent } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ButtonFill from '@/components/button/ButtonFill';

// Define the info for the dropdown menu
const dropdownData = [
  {
    title: 'Request Absentee Ballot',
    content: {
      paragraph1: 'Start your early voting process by requesting a absentee ballot for you or a family member. A few clicks is all it takes to ensure your participation in the upcoming election.',
      button1Text: 'Official absentee ballot application',
      button1Link: 'https://www.sec.state.ma.us/divisions/elections/download/absentee-ballot-applications/Absentee-Ballot-Application-English.pdf',
      paragraph2: 'Mail your completed application to:',
      paragraph3: 'Living outside of the US but still want to engage in Boston area elections?',
      button2Text: 'Overseas Assistance',
      button2Link: 'https://www.sec.state.ma.us/divisions/elections/voting-information/military-and-overseas-voters.htm',
    }
  },
  {
    title: 'Mail-In Ballot',
    content: {
      paragraph1: 'After completing and submitting your application, an Absentee Ballot will be sent to you in the mail with a set of return envelopes and mail-instructions.',
      button1Text: 'Track Your Ballot',
      button1Link: ''
    }
  },
  {
    title: 'Drop-Off Ballot',
    content: {
      button1Text: 'Drop Box Locations',
      button1Link: '/dropBoxLocations',
      paragraphRed: 'You have until 8 p.m. on Election Day to drop off your ballot.'
    }
  },
  {
    title: 'In-Person Early Voting',
    content: {
      paragraph1: "During the early voting period, you don't have to vote at your assigned polling location, but any location that is convenient for you.",
      button1Text: 'Early Voting Locations',
      button1Link: '/dropBoxLocations',
      paragraphRed: 'You have until 12 p.m. the Monday before the election to vote in person.'
    }
  },
  {
    title: 'Election Day Voting',
    content: {
      paragraph1: 'See the map below for drop box locations on the day of the election.',
      button1Text: 'Drop Box Map',
      button1Link: '/dropBoxLocations',
    }
  },
];

const DropDownInfo = () => {
  return (
    <>
      <Grid container spacing={2} style={{ paddingLeft: '24px', paddingRight: '24px' }}>
        {dropdownData.map((item, index) => (
          <Grid item xs={12} sm={12} md={6} key={index}>
            <Accordion sx={{ backgroundColor: '#e2e8f0' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                {/* DROPDOWN TITLES */}
                <Typography sx={{ color: '#1d4ed8', fontSize: '20px' }}>{item.title}</Typography>
              </AccordionSummary>

              {/* CONTENT OF DROPDOWNS */}
              <AccordionDetails sx={{ textAlign: 'center' }}>

                {/* bullet list is only for drop-off ballot menu */}
                {(item.title === 'Drop-Off Ballot') && (
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ textAlign: 'left', maxWidth: '700px' }}>
                      <Typography sx={{ fontSize: '18px' }}>Ballots can be delivered via:</Typography>
                      <ul className={"list-disc list-inside"} style={{ fontSize: '18px' }}>
                        <li>In person to your local election office</li>
                        <li>Drop box in Boston</li>
                        <li>Any early voting location in Boston during early voting hours</li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* all have atleast 1 paragraph and button */}
                <Typography sx={{ fontSize: '18px' }}>
                  {item.content.paragraph1}
                </Typography>

                <ButtonFill name={item.content.button1Text} link={item.content.button1Link} className='h-16 p-5 my-8 rounded-full bg-blue-700 text-white' />

                {/* other paragraphs/buttons are only on certain dropdowns */}
                {item.content.paragraph2 && (
                  <Typography sx={{ fontSize: '18px' }}>
                    {item.content.paragraph2}
                  </Typography>
                )}

                {/* address card is only for first dropdown */}
                {(item.title === 'Request Absentee Ballot') && (
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Card sx={{ maxWidth: 275 }} className='mb-8 mt-4'>
                      <CardContent sx={{ textAlign: 'left' }}>
                        <Typography sx={{ fontSize: '18px' }}>Boston Election Department</Typography>
                        <Typography sx={{ fontSize: '18px' }}>1 City Hall Square, Room 241</Typography>
                        <Typography sx={{ fontSize: '18px' }}>Boston, MA 02201</Typography>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* additional paragraphs and buttons */}
                {item.content.paragraph3 && (
                  <Typography sx={{ fontSize: '18px' }}>
                    {item.content.paragraph3}
                  </Typography>
                )}
                {item.content.paragraphRed && (
                  <Typography className="text-red-600" sx={{ fontSize: '18px' }}>
                    {item.content.paragraphRed}
                  </Typography>
                )}
                {item.content.button2Text && (
                  <ButtonFill name={item.content.button2Text} link={item.content.button2Link} className='h-16 p-5 my-8 rounded-full bg-blue-700 text-white' />

                )}
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}
      </Grid>
      <div style={{ textAlign: 'center', marginTop: '60px' }}>
        <p>Need more information?</p><br />
        <p><strong>617-635-8683</strong></p>
        <p><strong>election@boston.gov</strong></p>
      </div>
    </>
  );
};

export default DropDownInfo;