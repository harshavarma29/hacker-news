import React, {PureComponent} from 'react';
import NewsCard from '../components/NewsCard';

var a=0, b=30;
class NewsCards extends PureComponent {

    constructor() {
        super();

        this.state = {
            data: [],
            news: []
        }
    }

    componentDidMount() {
        fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
        .then(response => response.json())
        .then(apiData => {
            this.setState({
                data: apiData
            })
            this.loadData(a, b)
        })
        .catch(err => console.log(err))
    }

    loadData = (x, y) => {
        let arr = [];

        for(var i=x;i<y && i<this.state.data.length;i++) {
            arr.push(fetch('https://hacker-news.firebaseio.com/v0/item/'+this.state.data[i]+'.json?print=pretty'))
        }

        Promise.all(arr)
        .then(indexData => {
            indexData.forEach(response => {
                response.json()
                .then(item => {
                    this.setState({
                        news: [...this.state.news, item]
                    })
                })
            })
        })
        .catch(err => console.log("Error is: "+err))

        a=x+30;
        b=y+30;
    }

    render() {

        const {news, data} = this.state;

        return <React.Fragment>
                    <ol style={{display: 'inline'}}>
                        {
                            news.map((item, id) => {
                                return <NewsCard key={id} content={item}/>
                            })
                        }
                    </ol>
                    <div className='logo' onClick={() => this.loadData(a, b)}>
                        {
                            (b > data.length)? 'No More Data is Availabe'
                            : 'More'
                        }
                    </div>
            </React.Fragment>
    }
}

export default React.memo(NewsCards);