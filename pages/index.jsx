import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import CardContent from '@mui/material/CardContent';
import logo from "../public/app_logo.png"

import _ from "underscore";

const AnyReactComponent = ({ text }) => <div style={{ color: 'red', fontSize: '20px' }}>{text}</div>;

let layoutStyle = {
  dsiplay: 'flex',
  flexDirection: 'Column',
  justifyContent: 'center',
  padding: '50%'

}

export default function Tracker() {

  const [tripCode, setTripCode] = React.useState(null);
  const [trackPoints, setTrackPoints] = React.useState([]);
  const [trip, setTrip] = React.useState(null);
  const textField = React.useRef(null)
  const [lasts, setLasts] = React.useState([]);

  const [viewport, setViewport] = React.useState({
    longitude: -122.45,
    latitude: 37.78,
    width: "100%",
    height: "100%",
    zoom: 14
  });

  const defaultProps = {
    center: {
      lat: -37,
      lng: 144
    },
    zoom: 0
  };
  let value;
  async function getTrip() {
    let response = await fetch("https://asia-southeast2-tawtripmanager.cloudfunctions.net/getTrackPosts?tripCode=" + (textField?.current?.value), {
    });
    let details = await response.json();

    setTrip(details.trip);

    let points = Object.values(details.track.points);

    setTrackPoints(points);

    points = _.first(points, 50);
    points = points.reverse();

    setLasts(points);

  }
  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar variant="dense">

          <Typography variant="h6" color="inherit" component="div">
            Tow Trip Manager
          </Typography>
        </Toolbar>
      </AppBar>

      <div style={{ width: '100%', height: "100%", display: "flex", flexDirection: "column" }} >
        <image src={logo} />
        <Box
          sx={{
            width: 500,
            maxWidth: '100%',
            margin: 'auto',
            paddingTop: '50px'
          }}
        >
          <TextField fullWidth label="Type in the trip code supplied to you" id="fullWidth"
            inputRef={textField} />
        </Box>
        <Button variant="contained" sx={{
          margin: 'auto',
          marginTop: '1%',
          marginBottom: '1%'
        }}
          onClick={async () => {
            getTrip()
          }}
        > Get Trip Progress</Button>
        {trip && (<div style={{ dsiplay: "flex", flexFlow: "row no-wrap", justifyContent: "space-between" }}>
          <div >
            <span>
              <Card sx={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                <CardContent flexDirection="row" >

                  <Typography sx={{ fontSize: 14 }} color="secondary" gutterBottom>
                    Trip Complaince
                  </Typography>
                  <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                    <CircularProgress variant="determinate" value={trip?.progress <= 1 ? (Math.round(trip?.progress * 100), 2) : 100} />
                    <Box
                      sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography variant="caption" component="div" color="secondary">
                        {trip?.progress <= 1 ? (Math.round(trip.progress * 100), 2) : 100} %
                      </Typography>
                    </Box>
                  </Box>
                  <Typography sx={{ mb: 1.5 }} color="secondary">
                    {trip?.Name} {trip?.tripCode}
                  </Typography>
                  <Button>

                    <a color="inherit" underline="always" href={"https://asia-southeast2-tawtripmanager.cloudfunctions.net/createTripReport?pin=" + trip.pin + "&&business=1&&tripName=" + trip.name} rel="noreferrer" target="_blank">Download Trip Report</a>
                  </Button>
                </CardContent>
                <CardContent flexDirection="row" >
                  <Typography sx={{ fontSize: 14 }} color="secondary" gutterBottom>
                    Truck Info
                  </Typography>
                  <Typography component="div">
                    {trip?.truck}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="secondary">

                  </Typography>
                </CardContent>
                <CardContent flexDirection="row" >
                  <Typography sx={{ fontSize: 14 }} color="secondary" gutterBottom>
                    Driver Info
                  </Typography>
                  <Typography component="div">
                    {trip?.driver}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="secondary">

                  </Typography>
                </CardContent>
                <CardContent flexDirection="row" >
                  <Typography sx={{ fontSize: 14 }} color="secondary" gutterBottom>
                    Freight Details
                  </Typography>
                  {(trip?.thingsToCarry || []).map((thing, index) => {
                    return (
                      <Typography key={index} component="div">
                        {thing?.client}  {thing?.type},  {thing?.pickup} to {thing?.dropoff}
                      </Typography>
                    )
                  })}

                </CardContent>



              </Card>
            </span>
          </div>
          <Button variant="contained" sx={{
            alignSelf: 'center',
            marginLeft: '40%',
            marginTop: '1%',
            marginBottom: '1%'
          }} onClick={async () => {
            getTrip()
          }} >Refresh</Button>
          <div style={{ dsiplay: "flex", flexDirection: "column", width: "100%", justifyContent: "space-between", }}>
            <Timeline        >
              {(points || []).map((point, index) => {
                return (<TimelineItem key={index}>

                  <TimelineSeparator>
                    <TimelineDot color={index == (0) ? "success" : "secondary"} />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    {index == 0 && (<Typography color="green">
                      Current
                    </Typography>)}
                    <Typography>
                      {point.date}
                    </Typography>
                    <Typography>
                      {point.location}
                    </Typography>
                  </TimelineContent>
                </TimelineItem>)
              })}
            </Timeline>
          </div>
        </div>)}


      </div>

    </React.Fragment >
  );
}
