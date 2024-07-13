import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactEcharts from 'echarts-for-react';
import './Statistics.css';

const Statistics = () => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/api/statistics', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setStatistics(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch statistics. Please try again later.');
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const topPostsOptions = {
    title: {
      text: 'Top 3 Posts by Likes'
    },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: statistics.top_posts.map(post => post.name)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Number of Likes',
        type: 'bar',
        data: statistics.top_posts.map(post => post.numberOfLikes)
      }
    ]
  };

  const postsByDayOptions = {
    title: {
      text: 'Number of Posts by Day'
    },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: statistics.posts_by_day.map(post => post.date)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Number of Posts',
        type: 'line',
        data: statistics.posts_by_day.map(post => post.count)
      }
    ]
  };

  return (
    <div className="statistics-container">
      <h2>Post Statistics</h2>
      <div className="chart-container">
        <div className="chart">
          <ReactEcharts option={topPostsOptions} />
        </div>
        <div className="chart">
          <ReactEcharts option={postsByDayOptions} />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
