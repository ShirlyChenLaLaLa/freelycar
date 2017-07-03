import React from 'react';
import CustomerInfo from '../forms/CustomerInfo.jsx'
import ServiceTable from '../tables/ServiceTable.jsx'
import PartsDetail from '../tables/PartsDetail.jsx'
import BreadcrumbCustom from '../BreadcrumbCustom.jsx'
import AjaxGet from '../../utils/ajaxGet'
import { Row, Col, Card, Button, Radio, DatePicker, Table, Input, Select, Pagination, Popconfirm, Icon, Modal } from 'antd';
import moment from 'moment';
import { Link } from 'react-router';
import $ from 'jquery';
import update from 'immutability-helper'
const Option = Select.Option;
// 日期 format
const dateFormat = 'YYYY/MM/DD';


class OtherPay extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            view: false,
            typeList: [],
            selectedRowKeys: [],
            pagination: {},
            loading: false,
            type: [],
            selectedRow: [],
            option: [],
            data: [],
            selectedIds: [],
        }
    }
    componentDidMount() {
        this.getType()
        this.getList(1, 10)
        AjaxGet('GET', 'data/LicensePlate.json', (res) => {
            this.setState({ option: res.data })
        })
    }
    getType = () => {
        $.ajax({
            url: 'api/charge/listtype',
            data: {
            },
            success: (result) => {
                console.log(result)
                if (result.code == "0") {

                    this.setState({
                        typeList: result.data,
                    })
                }
            }
        })
    }
    getList = (page, number) => {
        $.ajax({
            url: 'api/charge/list',
            data: {
                page: page,
                number: number
            },
            success: (result) => {
                console.log(result)
                if (result.code == "0") {
                    let data = result.data
                    for (let item of data) {
                        item['key'] = item.id
                    }
                    this.setState({
                        data: data,
                        pagination: update(this.state.pagination, { ['total']: { $set: result.realSize } })
                    })
                }
            }
        })
    }

    onDelete = (index) => {
        const dataSource = [...this.state.data];
        dataSource.splice(index, 1);
        this.setState({ data: dataSource });
    }
    deleteItems = (idArray) => {
        $.ajax({
            type: 'post',
            url: 'api/charge/delete',
            // contentType:'application/json;charset=utf-8',
            dataType: 'json',
            data: {
                ids: idArray
            },
            traditional: true,
            success: (result) => {
                if (result.code == "0") {
                    let dataSource = [...this.state.data];
                    for (let id of idArray) {
                        dataSource = dataSource.filter((obj) => {
                            return id !== obj.id;
                        });
                    }
                    console.log(dataSource)
                    this.setState({
                        data: dataSource,
                        pagination: update(this.state.pagination, { ['total']: { $set: result.realSize } })
                    });
                }
            }
        })
    }
    searchGroupManage = (params) => {
        console.log(params)
    }
    handleChange = (value) => {
        console.log(`selected ${value}`)
    }
    setTypeValue = (value) => {
        this.setState({
            type: value
        })
    }
    showModal = () => {
        this.setState({
            visible: true
        })
    }
    handleOk = () => {
        this.setState({
            visible: false
        });
        $.ajax({
            url: 'api/charge/addtype',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data: JSON.stringify({
                name: this.state.type
            }),
            traditional: true,
            success: (result) => {
                console.log(result)
                if (result.code == "0") {
                    this.getType()
                }
            }
        })
    }
    addPay = () => {

    }
    handleCancel = () => {
        this.setState({
            visible: false
        });
    }
    render() {
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                let selectedIds = []
                for (let item of selectedRows) {
                    selectedIds.push(item.id);
                }
                this.setState({
                    selectedIds: selectedIds
                })
            }
        }, conlums = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => {
                return <span>{index + 1}</span>
            }
        }, {
            title: '单据编号',
            dataIndex: 'id',
            key: 'id'
        }, {
            title: '单据日期',
            dataIndex: 'expendDate',
            key: 'expendDate'
        }, {
            title: '支出类别',
            dataIndex: 'type',
            key: 'type',
            render: (text, record, index) => {
                return <span>{text.name}</span>
            }
        }, {
            title: '支出金额',
            dataIndex: 'amount',
            key: 'amount'
        }, {
            title: '备注',
            dataIndex: 'comment',
            key: 'comment'
        }, {
            title: '创建时间',
            dataIndex: 'createDate',
            key: 'createDate'
        }], typeOptions = this.state.typeList.map((item, index) => {
            return <Option key={index} value={item.id + ''}>{item.name}</Option>
        })
        return (
            < div >
                <BreadcrumbCustom first="收支管理" second="其他支出" />
                <Card style={{ marginBottom: '10px' }}>
                    <Row style={{ marginBottom: '20px' }}>
                        <Col span={8}>
                            支出类别：<Select
                                style={{ width: '100px' }}
                                placeholder="选择支出类别"
                                optionFilterProp="children"
                                onChange={this.handleChange}
                                filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                            >
                                {typeOptions}
                            </Select>
                            <Icon type="plus-circle-o" onClick={this.showModal} style={{ marginLeft: '10px', color: '#108ee9', cursor: 'pointer' }} />
                            <Modal title="编辑" visible={this.state.visible}
                                onOk={this.handleOk} onCancel={this.handleCancel}
                                okText="保存" cancelText="取消">
                                <span>支出类别名称：</span>
                                <Input value={this.state.type} style={{ width: '200px' }} onChange={(e) => this.setTypeValue(e.target.value)} />
                            </Modal>
                        </Col>
                        <Col span={8}>
                            <span>查找日期 : </span>
                            <DatePicker.RangePicker
                                format={dateFormat}
                                showToday={true}
                            />
                        </Col>
                        <Col span={8}>
                            <Button type="primary" size={'large'}><Link to="" style={{ color: '#fff' }}>查询</Link></Button>
                        </Col>
                    </Row>
                </Card>
                <Card>
                    <div className="table-operations">
                        <Button onClick={() => this.addPay()}>增加</Button>
                        <Modal
                            title="支出单"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                        >

                            <Row gutter={16} style={{ marginBottom: '10px' }}>
                                <Col span={8} style={{ textAlign: 'right' }}>
                                    单据日期：
                            </Col>
                                <Col span={8} style={{ textAlign: 'right' }}>
                                    <Input />
                                </Col>
                            </Row>

                            <Row gutter={16} style={{ marginBottom: '10px' }}>
                                <Col span={8} style={{ textAlign: 'right' }}>
                                    支出类别：
                            </Col>
                                <Col span={8}>
                                    <Input/>
                                </Col>
                            </Row>
                            <Row gutter={16} style={{ marginBottom: '10px' }}>
                                <Col span={8} style={{ textAlign: 'right' }}>
                                    支出金额：
                            </Col>
                                <Col span={8}>
                                    <Input  />
                                </Col>
                            </Row>
                            <Row gutter={16} style={{ marginBottom: '10px' }}>
                                <Col span={8} style={{ textAlign: 'right' }}>
                                    备注：
                            </Col>
                                <Col span={8}>
                                    <Input type="textarea" rows={3}  />
                                </Col>
                            </Row>
                        </Modal>
                        <Button onClick={() => this.deleteItems(this.state.selectedIds)}>删除</Button>
                    </div>
                    <Table pagination={this.state.pagination} bordered columns={conlums} dataSource={this.state.data} onChange={this.handleChange} rowSelection={rowSelection} >
                    </Table>
                </Card>
            </div >
        );
    }
}
export default OtherPay