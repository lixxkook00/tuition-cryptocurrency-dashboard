// @mui
import PropTypes from 'prop-types';
import { Card, Typography, CardHeader, CardContent } from '@mui/material';
import { Timeline, TimelineDot, TimelineItem, TimelineContent, TimelineSeparator, TimelineConnector } from '@mui/lab';
// utils
import { fDateTime, fTimeTZ } from '../../utils/formatTime';

AppOrderTimeline.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default function AppOrderTimeline({ title, data, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} />

      <CardContent
        sx={{
          '& .MuiTimelineItem-missingOppositeContent:before': {
            display: 'none',
          },
        }}
      >
        <Timeline>
          {
            data?.map((item, index) => (
              <OrderItem key={item.SemesterID} item={item} isLast={index === data.length - 1} />
            ))
          }
          {/* {list.map((item, index) => (
            <OrderItem key={item.id} item={item} isLast={index === list.length - 1} />
          ))} */}
        </Timeline>
      </CardContent>
    </Card>
  );
}

function OrderItem({ item, isLast }) {
  const { type, SemesterName } = item;
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          color={
            // (type === 'order1' && 'primary') ||
            // (type === 'order2' && 'success') ||
            // (type === 'order3' && 'info') ||
            // (type === 'order4' && 'warning') ||
            (isLast && 'primary') || 'error'
          }
        />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent>
        <Typography variant="subtitle2">{SemesterName}</Typography>

        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {fTimeTZ(item.due_day)}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}
