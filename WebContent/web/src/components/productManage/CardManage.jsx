import React from 'react';
import BreadcrumbCustom from '../BreadcrumbCustom.jsx'
import EditableCell from '../tables/EditableCell.jsx'
import CardModal from './CardModal.jsx'
import $ from 'jquery';
import update from 'immutability-helper'
import { Row, Col, Card, Button, Radio, DatePicker, Table, Tabs, Input, Select, Icon, Popconfirm, Modal, Form } from 'antd';
import moment from 'moment';
import { Link } from 'react-router';
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
// 日期 format
const dateFormat = 'YYYY/MM/DD';


//可编辑的table 
class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //模态框状态
            visible: false,
            //会员卡类别数据
            data: [],
            cardName: '',//条件查询的卡类,
            selectedRowKeys:[],
            pagination:{}
        }

    }

    componentDidMount() {
        this.loadData(1, 10);
    }

    //条件查询
    queryData = () => {
        this.loadData(1, 10, this.state.cardName);
    }


    //获取数据的函数
    loadData = (page, number, cardName) => {
        let jsonData = {};
        jsonData.name = cardName;
        jsonData.page = page;
        jsonData.number = number;
        $.ajax({
            url: '/api/service/query',
            data: jsonData,
            dataType: 'json',
            type: 'get',
            success: (res) => {
                let code = res.code;
                if (code == '0') {
                    let tableDate = [];//表格显示的数据
                    let arr = res.data;
                    for (let i = 0, len = arr.length; i < len; i++) {
                        let obj = arr[i];
                        let tableItem = {};
                        for (let item in obj) {
                            if (item == 'id')
                                tableItem.key = obj[item];
                            else if (item == 'type') {
                                let type = obj[item];
                                if (type == 0)
                                    type = '次卡';
                                else if (type == 1)
                                    type = '组合卡';
                                tableItem[item] = type;
                            }
                            else
                                tableItem[item] = obj[item];
                        }
                        tableDate.push(tableItem);
                    }
                    this.setState({ data: tableDate, pagination: { total: res.realSize }, });
                }

            }

        });
    }



    // 模态框的处理函数
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (obj) => {
        this.setState({
            visible: false,
        });

        this.setState({
            data: [...this.state.data, obj],
        });

    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }
    //end of modal
    //可编辑表格的处理函数
    onCellChange = (index, key) => {
        return (value) => {
            const dataSource = [...this.state.data];
            dataSource[index][key] = value;
            this.setState({ data: dataSource });
        };
    }
    onDelete = (idArray) => {
        $.ajax({
            url:'api/service/delete',
            type:'post',
            data:{serviceIds:idArray},
            traditional:true,
            dataType:'json',
            success:(res)=>{
                console.log(res);
                let code = res.code;
                if (code == '0' || code == '18') {
                    let dataSource = [...this.state.data];

                    for (let id of idArray) {
                        dataSource = dataSource.filter((obj) => {
                            return id !== obj.key;
                        });
                    }
                    //console.log(dataSource)
                    this.setState({
                        data: dataSource,
                        //pagination: update(this.state.pagination, { ['total']: { $set: result.realSize } })
                    });

                }
            }


        });
    }
    handleChange = (p) => {
        this.loadData(p.current,10);
    }
    render() {
        //卡类的表头
        const columns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => {
                return <span>{index + 1}</span>
            }
        }, {
            title: '卡类名称',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: '卡类属性',
            dataIndex: 'type',
            key: 'type'
        }, {
            title: '售卡金额',
            dataIndex: 'price',
            key: 'price'
        }, {
            title: '有效期(年)',
            dataIndex: 'validTime',
            key: 'valateTime'
        }, {
            title: '创建时间',
            dataIndex: 'createDate',
            key: 'create-time'
        }, {
            title: '备注',
            dataIndex: 'comment',
            key: 'comment'
        }, {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record, index) => {
                return (
                    <div>
                        <a onClick={this.showModal}>修改</a>
                        &nbsp;&nbsp;
                                <Popconfirm title="确认要删除吗?" onConfirm={() => this.onDelete([record.key])}>
                            <a href="#">删除</a>
                        </Popconfirm>
                    </div>
                );
            },
        }];

        //表格前面选择
        // rowSelection object indicates the need for row selection
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                this.setState({selectedRowKeys:selectedRowKeys});
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User',    // Column configuration not to be checked
            }),
        };

        //表单
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 10 },
            },
        };


        return (
            <div>
                <BreadcrumbCustom first="产品管理" second="卡类管理" />

                <Card>
                    <div>
                        <Row>
                            <Col span={5} style={{ verticalAlign: 'middle' }}>
                                    <span>卡类名称 : </span>
                                    <Input style={{width:'140px'}} onChange={(e) => this.setState({ cardName: e.target.value })} />
                            </Col>
                            <Col span={3}>
                                <Button type="primary" onClick={this.queryData}>查询</Button>
                            </Col>
                        </Row>

                        <Row style={{ marginTop: '40px', marginBottom: '20px' }}>
                            <Col span={2}>
                                <Button className="editable-add-btn" onClick={this.showModal}>新增卡类</Button>
                            </Col>
                            <Col span={8}>
                                <Button onClick={()=>{this.onDelete(this.state.selectedRowKeys)}}>删除卡类</Button>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={24}>
                                <Table
                                    rowSelection={rowSelection}
                                    columns={columns}
                                    dataSource={this.state.data}
                                    bordered
                                    pagination={this.state.pagination}
                                    onChange={(pagination) => this.handleChange(pagination)}
                                />
                            </Col>
                        </Row>

                    </div>
                </Card>
                <CardModal visible={this.state.visible} onOk={this.handleOk}
                    onCancel={this.handleCancel}></CardModal>

            </div>
        );
    }
}
export default EditableTable



//可编辑的table 
class ModalEditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }

    }


    onCellChange = (index, key) => {
        return (value) => {
            const dataSource = [...this.state.data];
            dataSource[index][key] = value;
            this.setState({ dataSource });
        };
    }
    onDelete = (index) => {
        const dataSource = [...this.state.data];
        dataSource.splice(index, 1);
        this.setState({ data: dataSource });
    }
    handleAdd = () => {
        
    }
    render() {
        const columns = [{
            title: '项目名称',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: '可用次数',
            dataIndex: 'count',
            key: 'count'
        }, {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record, index) => {
                return (
                    this.state.data.length > 1 ?
                        (
                            <div>
                                <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(index)}>
                                    <a href="#">删除</a>
                                </Popconfirm>
                            </div>
                        ) : null
                );
            },
        }];

        return (
            <div>
                <Button className="editable-add-btn" onClick={this.handleAdd} style={{ marginBottom: '15px' }}>新增</Button>
                <Table
                    columns={columns}
                    dataSource={this.state.data}
                    bordered
                    pagination = {this.state.pagination}
                    onChange={(pagination) => this.handleChange(pagination)}
                />
            </div>
        );
    }
}

