import {
  Radio,
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  TimePicker,
} from "antd";

/*TODO
Bind inputs to variables
'Add Timeslot' button should be push the range to an array rather than submitting the entire form
Make a confirmation toast notification?
*/

const AddFacility = () => {
  return (
    <main>
      <div className="main-container">
        <Form name="getFacility" autoComplete="off">
          <Form.Item
            label="Name of Facility"
            name="facilityName"
            rules={[
              {
                required: true,
                message: "Please proivde name of the facility",
              },
            ]}
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
          >
            <Input placeholder="Enter name of facility" />
          </Form.Item>

          <Card
            bodyStyle={{
              backgroundColor: "var(--primary-bg)",
              width: 700,
            }}
          >
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please add the timeslot",
                },
              ]}
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              style={{
                maxWidth: 600,
              }}
              label="Add timeslots"
              name="timeslot"
            >
              <TimePicker.RangePicker></TimePicker.RangePicker>
            </Form.Item>
            <Form.Item
              label="Amount to be paid (in INR)"
              name="amount"
              rules={[
                {
                  required: true,
                  message: "Please input your password",
                },
              ]}
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              style={{
                maxWidth: 600,
              }}
            >
              <InputNumber defaultValue={0}></InputNumber>
            </Form.Item>
            <Form.Item
              label="Only for Females"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
            >
              <Radio.Group defaultValue={false}>
                <Radio value={true}> Yes </Radio>
                <Radio value={false}> No </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Button type="dashed">Add Timeslot</Button>
            </Form.Item>
          </Card>
          <Form.Item>
            <Button type="primary">Add Facility</Button>
          </Form.Item>
        </Form>
      </div>
    </main>
  );
};

export default AddFacility;
