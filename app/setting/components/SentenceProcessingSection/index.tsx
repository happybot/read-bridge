import { useMemo, useState } from "react";
import { Card } from "../index";
import { Button, Modal, Form, Input, Select, Popconfirm, List, Typography, Space, Tooltip, Switch } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined } from "@ant-design/icons";
import { useOutputOptions } from "@/store/useOutputOptions";
import { OutputOption } from "@/types/llm";
import { OUTPUT_TYPE } from "@/constants/prompt";
import TextArea from "antd/es/input/TextArea";
import { useTranslation } from "@/i18n/useTranslation";
import { BATCH_PROCESSING_SIZE_OPTIONS } from "@/constants/output";

export default function SentenceProcessingSection() {
  const { t } = useTranslation()
  const { sentenceOptions, addSentenceOptions, updateSentenceOptions, deleteSentenceOptions, toggleSentenceOption, resetSentenceOptions, batchProcessingSize, setBatchProcessingSize } = useOutputOptions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentOption, setCurrentOption] = useState<OutputOption | null>(null);
  const [form] = Form.useForm<OutputOption>();
  const typeMap = useMemo(() => ({
    [OUTPUT_TYPE.TEXT]: t('settings.text'),
    [OUTPUT_TYPE.SIMPLE_LIST]: t('settings.simpleList'),
    [OUTPUT_TYPE.KEY_VALUE_LIST]: t('settings.keyValueList'),
    [OUTPUT_TYPE.MD]: t('settings.markdown')
  }), [t]);

  const handleAdd = () => {
    setIsEdit(false);
    setCurrentOption(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record: OutputOption) => {
    setIsEdit(true);
    setCurrentOption(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDelete = (record: OutputOption) => {
    deleteSentenceOptions(record);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (isEdit && currentOption) {
        updateSentenceOptions({
          ...values,
          id: currentOption.id,
        });
      } else {
        addSentenceOptions(values);
      }
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.error("Form validation failed:", error);
    }
  };

  return (
    <Card>
      <div className="flex flex-col">
        <List
          dataSource={sentenceOptions}
          rowKey="id"
          renderItem={(item: OutputOption) => (
            <List.Item
              key={item.id}
              actions={[
                <Switch
                  checked={item.enabled}
                  onChange={() => toggleSentenceOption(item.id)}
                  key="toggle"
                />,
                <Button
                  type="text"
                  icon={<EditOutlined />}
                  onClick={() => handleEdit(item)}
                  key="edit"
                />,
                <Popconfirm
                  title={t('settings.deleteSentenceProcessing')}
                  description={t('common.templates.confirmDelete', { entity: t('common.entities.sentenceConfigAsObject') })}
                  onConfirm={() => handleDelete(item)}
                  okText={t('common.ok')}
                  cancelText={t('common.cancel')}
                  key="delete"
                >
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                  />
                </Popconfirm>
              ]}
            >
              <List.Item.Meta
                title={
                  <span style={{ opacity: item.enabled ? 1 : 0.5 }}>
                    {item.name}
                  </span>
                }
                description={
                  <Space direction="vertical" size="small" style={{ width: '100%' }}>
                    <Typography.Text type="secondary" style={{ opacity: item.enabled ? 1 : 0.5 }}>
                      {t('settings.sentenceType')}: {typeMap[item.type as keyof typeof typeMap] || item.type}
                    </Typography.Text>
                    <Typography.Paragraph ellipsis={{ rows: 2 }} style={{ opacity: item.enabled ? 1 : 0.5 }}>
                      {item.rulePrompt}
                    </Typography.Paragraph>
                  </Space>
                }
              />
            </List.Item>
          )}
        />
        <div className="flex justify-end items-center mt-4 gap-2">
          <Tooltip title={t('settings.batchProcessingSizeTooltip')} placement="left">
            <Select
              className="w-24"
              value={batchProcessingSize}
              onChange={setBatchProcessingSize}
              options={BATCH_PROCESSING_SIZE_OPTIONS}
            />
          </Tooltip>
          <Button
            icon={<PlusOutlined />}
            onClick={handleAdd}
          >
            {t('settings.addSentenceConfig')}
          </Button>
          <Popconfirm
            title={t('settings.resetSentenceConfig')}
            description={t('settings.resetSentenceConfigDescription')}
            onConfirm={resetSentenceOptions}
            okText={t('common.ok')}
            cancelText={t('common.cancel')}
          >
            <Button icon={<ReloadOutlined />}>{t('common.reset')}</Button>
          </Popconfirm>
        </div>
      </div>

      <Modal
        title={isEdit ? t('settings.editSentenceConfig') : t('settings.addSentenceConfig')}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose
        okText={t('common.ok')}
        cancelText={t('common.cancel')}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label={t('settings.sentenceConfigName')}
            rules={[{ required: true, message: t('common.templates.pleaseEnter', { field: t('common.entities.sentenceConfigName') }) }]}
          >
            <Input placeholder={t('settings.sentenceConfigName')} />
          </Form.Item>

          <Form.Item
            name="type"
            label={t('settings.sentenceConfigType')}
            tooltip={t('settings.sentenceTypeTooltip')}
            rules={[{ required: true, message: t('common.templates.pleaseSelect', { field: t('common.entities.sentenceConfigType') }) }]}
          >
            <Select placeholder={t('settings.sentenceConfigType')}>
              {Object.entries(typeMap).map(([key, value]) => (
                <Select.Option key={key} value={key}>{value}</Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="rulePrompt"
            label={t('settings.sentenceConfigPrompt')}
            rules={[{ required: true, message: t('common.templates.pleaseEnter', { field: t('common.entities.sentenceConfigPrompt') }) }]}
          >
            <TextArea
              placeholder={t('settings.sentenceConfigPrompt')}
              autoSize={{ minRows: 5, maxRows: 10 }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}

