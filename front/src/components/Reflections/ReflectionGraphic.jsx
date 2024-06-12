import { ChartsLegend, ChartsYAxis } from '@mui/x-charts';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { LinePlot, MarkPlot } from '@mui/x-charts/LineChart';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import dayjs from 'dayjs';
import React from 'react';
import * as variables from '../../app/shared/colorVariables';
import * as Styled from '../../styles/Reflections.styled';
import LoadingWrapper from '../UI/LoadingWrapper';

const ReflectionGraphic = ({ data, isLoading }) => {
  const xAxisData = data?.dates?.map((date) => {
    return new Date(date);
  });

  return (
    <LoadingWrapper isLoading={isLoading}>
      <Styled.ReflectionGraphic style={{ width: '100%', height: 300, fontSize: 18 }}>
        {data && (
          <ResponsiveChartContainer
            series={[
              {
                type: 'line',
                label: 'Emotion',
                data: data?.emotions,
                color: variables.DECIDE_CELL,
              },
              {
                type: 'line',
                label: 'Productivity',
                data: data?.productivity,
                color: variables.DELETE_CELL,
              },
            ]}
            xAxis={[
              {
                label: 'Date',
                data: xAxisData,
                tickInterval: 'auto',
                scaleType: 'time',
                valueFormatter: (date) => dayjs(date).format('MMM D'),
                labelStyle: { fontSize: 18 },
              },
            ]}
            yAxis={[
              {
                label: 'Rating',
                min: 1,
                max: 10,
                tickInterval: 'auto',
                scaleType: 'linear',
                labelStyle: { fontSize: 18 },
              },
            ]}>
            <MarkPlot />
            <LinePlot />
            <ChartsXAxis />
            <ChartsYAxis />
            <ChartsLegend
              slotProps={{
                legend: {
                  labelStyle: {
                    fontSize: 18,
                  },
                },
              }}
            />
          </ResponsiveChartContainer>
        )}
      </Styled.ReflectionGraphic>
    </LoadingWrapper>
  );
};

export default ReflectionGraphic;
