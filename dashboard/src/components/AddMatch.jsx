import {useState, useEffect} from "react"
import axios from "axios"
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import Toolbar from '@mui/material/Toolbar';
import Paper from "@mui/material/Paper/Paper";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs"

import ContentCopyIcon from '@mui/icons-material/ContentCopy';


const codeBlock= {
    backgroundColor: '#3b3b3b',
    padding: '8px',
    borderRadius: '4px',
    fontFamily: 'Consolas, "Courier New", monospace',
    fontSize: '14px',
    marginBottom: '16px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent:"space-between",
    minWidth:"40px",
    width:"100%",
    color:"white"
  }
const copyButton =  {
    minWidth:"40px",
  }

export default function AddMatch(){
	const params =["Premier League", "La Liga", "Champions League", "Europa League", "Ligue 1", "Seria A", "Bundesliga"]
	const [copied, setCopied] = useState(false);
	const [link, setLink] = useState("")
	const [matchData, setMatchData] = useState({
		league:"Premier League",
		homeTeam:"",
		dateTime:"",
		awayTeam:""
	})
	const [sendRequest, setSendRequest] = useState(false)
  	const code = `function add(a, b) { return a + b; }`;
	const copyCodeToClipboard = () => {
    	navigator.clipboard.writeText(code);
    	setCopied(true);
    	setTimeout(() => setCopied(false), 1000);
    };

    const handleGenerateMatch = (e) => {
    	e.preventDefault()
    	setSendRequest(true)
    	console.log(matchData)
    }

    const handleChange = (e) => {
    	const {name, value} = e.target
    	console.log(e.target)
    	setMatchData((matchData)=>({
    		...matchData,
    		[name]:value
    	}))
    }

    useEffect(()=>{
    	axios.post(`${import.meta.env.VITE_BACKEND_URL}/matches/add`,matchData)
    	.then(res=> setLink(res.data.link))
    },[])


	return(
		<Box sx={{
			width:"100%",
			height:"auto",
			display:"flex",
			flexDirection:"column",
			alignItems:"center",
			justifyContent:"center"
		}}>
			{/*<Paper sx={{height:"60px", width:"100%", background:"red"}}>ghf</Paper>*/}
			<Toolbar sx={{height:"40px", minHeight:'36px', borderBottom:"1px solid #00000033", width:"100%"}}>
				<Typography variant='p' sx={{textAlign:'center', width:"100%"}}>Add Match</Typography>
			</Toolbar>
			<Card sx={{
				marginTop:"40px",
				padding:"10px"
			}}>
				<Autocomplete
				  disablePortal
				  name="league"
				  value={matchData.league}
				  onChange={(event,newValue)=>setMatchData({...matchData,league:newValue})}
				  options={params}
				  sx={{ width: 300,marginLeft:"15px" }}
				  renderInput={(params) => <TextField {...params} label="League" />}
				/>
				<CardContent>
					<TextField
			          required
			          name="homeTeam"
			          id="outlined-required"
			          label="Home Team"
			          onChange={handleChange}
			          value={matchData.homeTeam}
			        />
			        <LocalizationProvider dateAdapter={AdapterDayjs}>
			        <DateTimePicker 
				        sx={{px:"10px"}} 
				        label="Kick-off" 
				        value={matchData.dateTime} 
				        name="dateTime"
				        onChange={(newValue)=>setMatchData({...matchData,dateTime:newValue.$d})}
			        />
			        </LocalizationProvider>
			        <TextField
			          required
			          name="awayTeam"
			          id="outlined-required"
			          label="Away Team"
			          onChange={handleChange}
			          value={matchData.awayTeam}
			        />
			        <br/>
			        <Button variant="contained" size="medium" sx={{marginTop:"20px"}} onClick={handleGenerateMatch}>
			          Generate Match
			        </Button>			        
				</CardContent>
				<CardActions>
					{link && 
			        <Typography variant="body1" component="div" sx={{maxWidth:"95%", marginTop:'15px'}}>
      					<Box variant="div" sx={codeBlock}>
	        				<pre>
	          					<code>{code}</code>
	        				</pre>
	        				<Button
					          variant={copied ? 'contained' : 'outlined'}
					          color="success"
					          size="small"
					          sx={copyButton}
					          onClick={copyCodeToClipboard}
	        				>
	          					{<ContentCopyIcon/>}
	        				</Button>
      					</Box>
    				</Typography>
    				}
				</CardActions>
			</Card>
		</Box>
		);
}
