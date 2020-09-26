import React, { useEffect, useState } from 'react';
import { Input, Tag, Tooltip } from 'antd';
import classes from './TagCategoriesOrder.module.scss';

interface ITagProps {
  categories: string[];
  onTag(tags): void;
}

export const TagCategoriesOrder: React.FC<ITagProps> = ({
  categories,
  onTag,
}) => {
  const [tags, setTags] = useState<string[]>(categories);
  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>();
  const [editInputIndex, setEditInputIndex] = useState<number>(-1);
  const [editInputValue, setEditInputValue] = useState<string>('');

  useEffect(() => {
    onTag(tags);
  }, [tags, onTag]);

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setEditInputValue('');
  };

  const handleInputConfirm = () => {
    inputValue ? setTags([...tags, inputValue]) : setTags([...tags]);
    setInputVisible(false);
    setInputValue('');
  };

  const handleClose = (removeTag) => {
    const lstTags = tags.filter((tag) => tag !== removeTag);
    setTags(lstTags);
  };

  return (
    <div className={classes.root}>
      <h2>Категории</h2>
      {tags.map((tag, index) => {
        if (editInputIndex === index) {
          return (
            <Input
              key={tag}
              size="small"
              className={classes.tagInput}
              value={editInputValue}
              onChange={(event) => setEditInputValue(event.target.value)}
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
            />
          );
        }

        const isLongTag = tag ? tag.length > 20 : 0;

        const tagElem = (
          <Tag
            className={classes.editTag}
            key={tag}
            closable
            onClose={() => handleClose(tag)}
          >
            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
      {inputVisible && (
        <Input
          type="text"
          size="small"
          className={classes.tagInput}
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag
          className={classes.siteTagPlus}
          onClick={() => setInputVisible(true)}
        >
          +Добавить категорию
        </Tag>
      )}
    </div>
  );
};
