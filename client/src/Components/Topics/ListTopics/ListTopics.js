import { Button } from 'reactstrap';
export const ListTopics = ({ topics }) => {
  return (
    <>
      {topics.map((topic, i) => (
        <Button
          color="light"
          className="mt-2 ms-0 me-2 mb-2"
          key={`topic_${i}`}
        >
          {topic.name}
        </Button>
      ))}
    </>
  );
};
