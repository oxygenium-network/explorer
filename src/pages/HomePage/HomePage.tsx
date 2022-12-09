/*
Copyright 2018 - 2022 The Alephium Authors
This file is part of the alephium project.

The library is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

The library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with the library. If not, see <http://www.gnu.org/licenses/>.
*/

import { addApostrophes } from '@alephium/sdk'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { usePageVisibility } from 'react-page-visibility'
import { useNavigate } from 'react-router-dom'
import styled, { css } from 'styled-components'

import Card from '@/components/Cards/Card'
import CardWithChart from '@/components/Cards/CardWithChart'
import FullScreenCard from '@/components/Cards/FullScreenCard'
import StatisticTextual from '@/components/Cards/StatisticTextual'
import LineAreaChart from '@/components/Charts/LineAreaChart'
import Counter from '@/components/Counter'
import PageSwitch from '@/components/PageSwitch'
import SearchBar from '@/components/SearchBar'
import Section from '@/components/Section'
import Table, { TDStyle } from '@/components/Table/Table'
import TableBody from '@/components/Table/TableBody'
import TableHeader from '@/components/Table/TableHeader'
import TableRow from '@/components/Table/TableRow'
import Timestamp from '@/components/Timestamp'
import Waves from '@/components/Wave/Waves'
import useInterval from '@/hooks/useInterval'
import usePageNumber from '@/hooks/usePageNumber'
import { useWindowSize } from '@/hooks/useWindowSize'
import { deviceBreakPoints, deviceSizes } from '@/styles/globalStyles'
import { formatNumberForDisplay } from '@/utils/strings'

import useBlockListData from './useBlockListData'
import useStatisticsData, { TimeFrame } from './useStatisticsData'

dayjs.extend(duration)

type VectorStatisticsKey = keyof ReturnType<typeof useStatisticsData>['data']['vector']

const HomePage = () => {
  const navigate = useNavigate()
  const { width } = useWindowSize()
  const isAppVisible = usePageVisibility()
  const currentPageNumber = usePageNumber()
  const [detailsCardOpen, setDetailsCardOpen] = useState<VectorStatisticsKey>()

  const [timeFrame, setTimeFrame] = useState<TimeFrame>('daily')

  const {
    getBlocks,
    blockPageLoading,
    data: { blockList }
  } = useBlockListData(currentPageNumber)

  const {
    fetchStatistics,
    data: {
      scalar: { hashrate, totalSupply, circulatingSupply, totalTransactions, totalBlocks, avgBlockTime },
      vector
    }
  } = useStatisticsData(timeFrame)

  const vectorData = vector

  // Polling
  useInterval(
    () => {
      fetchStatistics()

      if (currentPageNumber === 1) {
        getBlocks(currentPageNumber, false)
      }
    },
    10 * 1000,
    !isAppVisible
  )

  const [hashrateInteger, hashrateDecimal, hashrateSuffix] = formatNumberForDisplay(hashrate.value, '', 'hash')

  const currentSupplyPercentage =
    circulatingSupply.value && totalSupply.value && ((circulatingSupply.value / totalSupply.value) * 100).toPrecision(3)

  const fullScreenCardLabels: Record<VectorStatisticsKey, string> = {
    txVector: `Transactions per ${timeFrame === 'daily' ? 'day' : 'hour'}`,
    hashrateVector: `Hashrate per ${timeFrame === 'daily' ? 'day' : 'hour'}`
  }

  return (
    <StyledSection>
      {width && width > deviceSizes.mobile && (
        <Search>
          <h2>Search</h2>
          <SearchBar />
        </Search>
      )}
      <MainContent>
        <StatisticsSection>
          <StatisticsHeader>
            <h2>Our numbers</h2>
            <TimeFrameSwitch>
              <TimeFrameButton isSelected={timeFrame === 'daily'} onClick={() => setTimeFrame('daily')}>
                Daily
              </TimeFrameButton>
              <TimeFrameButton isSelected={timeFrame === 'hourly'} onClick={() => setTimeFrame('hourly')}>
                Hourly
              </TimeFrameButton>
            </TimeFrameSwitch>
          </StatisticsHeader>
          <StatisticsContainer>
            <CardWithChart
              label="Transactions"
              chartSeries={vectorData.txVector.value.series}
              chartColors={['#16cbf4', '#8a46ff']}
              isLoading={totalTransactions.isLoading}
              onClick={() => setDetailsCardOpen('txVector')}
              layoutId={`expandableCard-${'txVector' as VectorStatisticsKey}`}
            >
              <StatisticTextual
                primary={totalTransactions.value ? <Counter to={totalTransactions.value} /> : '-'}
                secondary="Total"
              />
            </CardWithChart>
            <CardWithChart
              chartSeries={vectorData.hashrateVector.value.series}
              chartColors={['#b116f4', '#ff904c']}
              label="Hashrate"
              isLoading={hashrate.isLoading}
              onClick={() => setDetailsCardOpen('hashrateVector')}
              layoutId={`expandableCard-${'hashrateVector' as VectorStatisticsKey}`}
            >
              <StatisticTextual
                primary={hashrateInteger ? addApostrophes(hashrateInteger) + (hashrateDecimal ?? '') : '-'}
                secondary={`${hashrateSuffix}H/s`}
              />
            </CardWithChart>
            <Card label="Supply" isLoading={circulatingSupply.isLoading || totalSupply.isLoading}>
              <StatisticTextual
                primary={
                  <>
                    <span>{circulatingSupply.value ? formatNumberForDisplay(circulatingSupply.value, '') : '-'}</span>
                    <TextSecondary> / </TextSecondary>
                    <TextSecondary>
                      {totalSupply.value ? formatNumberForDisplay(totalSupply.value, '') : '-'}
                    </TextSecondary>
                  </>
                }
                secondary={
                  currentSupplyPercentage ? (
                    <>
                      <TextPrimary>{currentSupplyPercentage}%</TextPrimary> is circulating
                    </>
                  ) : null
                }
              />
            </Card>
            <Card label="Blocks" isLoading={totalBlocks.isLoading}>
              <StatisticTextual
                primary={totalBlocks.value ? <Counter to={totalBlocks.value} /> : '-'}
                secondary="Total"
              />
            </Card>
            <Card label="Avg. block time (2h)" isLoading={avgBlockTime.isLoading}>
              <StatisticTextual
                primary={avgBlockTime.value ? dayjs.duration(avgBlockTime.value).format('m[m] s[s]') : '-'}
                secondary="of all shards"
              />
            </Card>
          </StatisticsContainer>
        </StatisticsSection>
        <LatestsBlocks>
          <h2>Latest Blocks</h2>
          <Content>
            <BlockListTable main isLoading={blockPageLoading} minHeight={498}>
              <TableHeader
                headerTitles={['Height', 'Timestamp', 'Txn', 'Chain index']}
                columnWidths={['20%', '30%', '20%', '25%']}
              />
              <TableBody tdStyles={TableBodyCustomStyles}>
                {blockList &&
                  blockList.blocks?.map((b) => (
                    <TableRow
                      key={b.hash}
                      onClick={() => {
                        navigate(`blocks/${b.hash}`)
                      }}
                    >
                      <td>
                        <BlockHeight>{b.height.toString()}</BlockHeight>
                      </td>
                      <td>
                        <Timestamp timeInMs={b.timestamp} />
                      </td>
                      <td>{b.txNumber}</td>
                      <td>
                        {b.chainFrom} → {b.chainTo}
                      </td>
                    </TableRow>
                  ))}
              </TableBody>
            </BlockListTable>
          </Content>
          <PageSwitch totalNumberOfElements={blockList?.total} elementsPerPage={blockList?.blocks?.length} />
        </LatestsBlocks>
      </MainContent>
      <Waves />
      <AnimatePresence initial={false}>
        {detailsCardOpen && (
          <FullScreenCard
            layoutId={`expandableCard-${detailsCardOpen}`}
            label={fullScreenCardLabels[detailsCardOpen]}
            key={detailsCardOpen}
            onClose={() => setDetailsCardOpen(undefined)}
          >
            <LineAreaChart
              series={vectorData[detailsCardOpen].value.series}
              categories={vectorData[detailsCardOpen].value.categories}
              colors={chartColors[detailsCardOpen]}
              xAxisType="datetime"
              yAxisType="formatted"
              timeFrame={timeFrame}
              unit={detailsCardOpen === 'hashrateVector' ? 'H/s' : ''}
            />
          </FullScreenCard>
        )}
      </AnimatePresence>
    </StyledSection>
  )
}

const chartColors: Record<VectorStatisticsKey, [string, string]> = {
  txVector: ['#16cbf4', '#8a46ff'],
  hashrateVector: ['#b116f4', '#ff904c']
}

export default HomePage

const StyledSection = styled(Section)`
  margin-top: -30px;
`

const MainContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  align-self: center;

  @media ${deviceBreakPoints.mobile} {
    flex-direction: column;
    gap: 30px;
  }
`

const Search = styled.div`
  margin: -35px auto 7vh auto;
  width: 60%;
`

const StatisticsSection = styled.div`
  flex: 1;
  min-width: 300px;
`

const StatisticsHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
  margin-top: 18px;

  h2 {
    margin: 0;
  }
`

const TimeFrameSwitch = styled.div`
  display: flex;
  gap: 10px;
`

const TimeFrameButton = styled.button<{ isSelected: boolean }>`
  padding: 4px;
  border: 1px solid ${({ theme }) => theme.borderSecondary};
  border-radius: 4px;
  background-color: transparent;
  color: ${({ theme }) => theme.textSecondary};

  ${({ isSelected }) =>
    isSelected &&
    css`
      border: 1px solid ${({ theme }) => theme.textSecondary};
      color: ${({ theme }) => theme.textPrimary};
    `}

  &:hover {
    border: 1px solid ${({ theme }) => theme.textPrimary};
  }
`

const StatisticsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;

  div:nth-child(1) {
    grid-column-end: span 2;
    grid-row: 1;
  }

  @media ${deviceBreakPoints.mobile} {
    gap: 15px;
  }

  @media ${deviceBreakPoints.tiny} {
    display: flex;
    flex-direction: column;
  }
`

const TextPrimary = styled.span`
  color: ${({ theme }) => theme.textPrimary};
`

const TextSecondary = styled.span`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.75em;

  @media ${deviceBreakPoints.mobile} {
    gap: 20px;
    font-size: 0.5em;
  }
`

const LatestsBlocks = styled.div`
  flex: 1;
  min-width: 300px;
`

const Content = styled.div``

const BlockListTable = styled(Table)`
  height: 498px;
`

const BlockHeight = styled.span`
  color: ${({ theme }) => theme.textAccent};
`

const TableBodyCustomStyles: TDStyle[] = [
  {
    tdPos: 4,
    style: css`
      font-feature-settings: 'tnum';
      font-weight: 600;
    `
  }
]
