import {useState, useEffect} from "react";
import ChartList from "../components/ChartList"

const ChartBox = () =>  {
    const [chart, setChart] = useState([]);

    const getChartData = (url) => {
        fetch(url)
            .then(response => response.json())
            .then(data => setChart(data.feed.entry))
    }
    
    useEffect(() => getChartData("https://itunes.apple.com/gb/rss/topsongs/limit=20/json"), []);

    const handleChange = (event) => {
        const dict= {
            all: "https://itunes.apple.com/gb/rss/topsongs/limit=20/json",
            rock: "https://itunes.apple.com/gb/rss/topsongs/limit=20/genre=21/json",
            dance: "https://itunes.apple.com/gb/rss/topsongs/limit=20/genre=17/json",
            country: "https://itunes.apple.com/gb/rss/topsongs/limit=20/genre=6/json",
        }
        getChartData(dict[event.target.value])
    }

    return(
        <>
    <select onChange={handleChange}>
        <option selected value="all">All</option>
        <option value="rock">Rock</option>
        <option value="dance">Dance</option>
        <option value="country">Country</option>
    </select>
    <ChartList chart={chart}/>
    </>
    )
}
export default ChartBox;