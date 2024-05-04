import { PlusSquareOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { Text } from "../Text/text";

interface Props {
  onClick: () => void;
}
const AddCardButton = ({
  children,
  onClick,
}: React.PropsWithChildren<Props>) => {
  return (
    <Button
      size="large"
      icon={<PlusSquareOutlined className="md" />}
      style={{
        margin: "16px",
        backgroundColor: "white",
      }}
      onClick={onClick}
    >
      {children ?? (
        <Text size="md" type="secondary">
          Add new card
        </Text>
      )}
    </Button>
  );
};

export default AddCardButton;
