import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, Radio, Row } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNewTask } from "../../redux/actions/taskActions";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";

const CreateNewTask = () => {
  const dispatch: AppDispatch = useDispatch();
 
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(!open);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(!open);
    navigate("/tasks/");
  };

  const handleFinish = async (values: any) => {

    await dispatch(addNewTask(values));
    navigate("/tasks/");
  };
  return (
    <Modal
      open={open}
      title="Add New Tasks"
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[]}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => handleFinish(values)}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter a title" }]}
        >
          <Input size="large" placeholder="input placeholder" />
        </Form.Item>

        <Row justify="end">
          <Col span={5} offset={6}>
            <Button size="large" onClick={handleCancel}>
              Cancel
            </Button>
          </Col>
          <Col span={4}>
            <Form.Item>
              <Button size="large" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default CreateNewTask;
