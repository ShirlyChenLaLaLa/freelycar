import React from 'react';
import BreadcrumbCustom from '../BreadcrumbCustom.jsx';
import { Card, Button, Input, Select, Menu, Icon, Row, Col, DatePicker, Radio } from 'antd';
import { Link } from 'react-router';
import update from 'immutability-helper';
import $ from 'jquery';
import AjaxGet from '../../utils/ajaxGet'
import AjaxSend from '../../utils/ajaxSend'
import { hashHistory } from 'react-router'
const RadioGroup = Radio.Group;
const Option = Select.Option;
class ModifyClient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            option: [],
            type: [],
            // value: '男',
            carvalue: 'true',
            carId: '',
            typeId: '',
            havetwocar: false,
            form: {
                name: '',
                age: '',
                idNumber: '',
                gender: '',
                phone: '',
                birthday: '',
                driverLicense: '',
                recommendName: '',

            },
            cars: [],

        }
    }
    componentDidMount() {
        this.getClientInfo()
        $.ajax({
            type: 'GET',
            url: '/api/car/listbrand',
            datatype: 'json',
            contentType: 'application/json;charset=utf-8',
            data: {},
            success: (res) => {

                this.setState({
                    option: res.data,


                })
                console.log(this.state.option)
            }
        })
    }
    getClientInfo = () => {
        $.ajax({
            url: 'api/client/detail',
            dataType: 'json',
            type: 'GET',
            data: {
                clientId: this.props.params.id,
            },
            success: (res) => {
                if (res.code == '0') {
                    console.log(res)
                    var obj = res.client;
                    let car = [];

                    obj.cars.map((item, index) => {
                        car.push({
                            licensePlate: item.licensePlate,
                            insuranceStarttime: (item.insuranceStarttime == undefined) ? "" : (item.insuranceStarttime).substring(0, 10),
                            insuranceEndtime: (item.insuranceEndtime == undefined) ? "" : (item.insuranceEndtime).substring(0, 10),
                            insuranceAmount: item.insuranceAmount,
                            frameNumber: item.frameNumber,
                            engineNumber: item.engineNumber,
                            licenseDate: (item.licenseDate == undefined) ? "" : (item.licenseDate).substring(0, 10),
                            newCar: item.newCar,
                            lastMiles: item.lastMiles,
                            miles: item.miles,
                            brand: item.type.brand.name,
                            cartype: item.type.type
                        })
                    })
                    this.setState({
                        cars: car
                    })

                    let clientInfo = {
                        name: obj.name,
                        age: obj.age,
                        idNumber: obj.idNumber,
                        gender: obj.gender,
                        phone: obj.phone,
                        birthday: (obj.birthday != "") ? (obj.birthday).substring(0, 10) : "",
                        driverLicense: obj.driverLicense,
                        recommendName: obj.recommendName,
                        points: obj.points,
                    }
                    this.setState({
                        form: clientInfo,
                    })
                }
            }
        })
    }
    //传数据
    saveData = (e) => {
        //console.log()
        let forms = this.state.form;
        $.ajax({
            type: 'post',
            url: '/api/client/add',
            datatype: 'json',
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify({

                name: forms.name,
                age: forms.age,
                idNumber: forms.idNumber,
                //radio选择
                gender: this.state.value,
                phone: forms.phone,
                //时间选择
                birthday: forms.birthday,
                driverLicense: this.state.driverLicense,
                recommendName: this.state.recommendName,
                cars: [{
                    //select选择
                    type: {
                        id: this.state.typeId,
                        // CarBrand:{
                        //     // name:'lambor',
                        //     // id:'3',

                        // },
                        //  type:
                    },
                    licensePlate: forms.licensePlate,
                    //时间选择
                    insuranceStarttime: forms.insuranceStarttime,
                    //时间选择
                    insuranceEndtime: forms.insuranceEndtime,
                    insuranceAmount: forms.insuranceAmount,
                    frameNumber: forms.frameNumber,
                    engineNumber: forms.engineNumber,
                    //时间选择
                    licenseDate: forms.licenseDate,
                    newCar: forms.newCar,
                    lastMiles: forms.lastMiles,
                    miles: forms.miles
                }]
            }),

            success: (result) => {
                if (result.code == "0") {
                    window.history.go(-1);
                    //  hashHistory.push('/app/member/customer')
                }
            }
        })

    }
    genderonChange = (e) => {
        console.log(e.target.value);
        this.setState({
            value: e.target.value,
        });
        this.state.form.gender = e.target.value
    }
    isnewcar = (e) => {
        console.log(e.target.value);
        this.setState({
            carvalue: e.target.value,
        });
        this.state.form.newCar = e.target.value
    }
    TypehandleChange = (value) => {
        console.log(`selected ${value}`);
        this.setState({
            typeId: value
        })
    }

    handleChange = (e) => {
        let typelist = this.state.option[e - 1].types;
        console.log(this.state.option[e - 1].types)
        this.setState({
            carId: e,
            type: typelist
        })
        // $.ajax({
        //     url:'/api/'
        // })

    }
    //时间选择函数
    birthdayonChange = (time) => {
        console.log(time);
        this.state.form.birthday = new Date(time);
    }

    licensetimeonChange = (time) => {
        console.log(time);
        this.state.form.licensetime = new Date(time);
    }
    onValueChange = (key, value) => {
        this.setState({
            form: update(this.state.form, { [key]: { $set: value } })
        })
    }
    carInfoChange = (key, value, index) => {
        this.setState({
            cars: update(this.state.cars, { [index]: { [key]: { $set: value } } })
        })
    }
    render() {
        const brandOptions = this.state.option.map((item, index) => {
            return <Option key={index} value={item.id + ''}>{item.name}</Option>
        })
        const typeOptions = this.state.type.map((item, index) => {
            return <Option key={index} value={item.id + ''}>{item.type}</Option>
        })
        const carsInfo = this.state.cars.map((item, index) => {
            return <Card key={index} title='车辆信息' style={{ marginTop: '20px' }}>
                <Row gutter={16} style={{ marginBottom: '15px' }}>
                    <Col span={8} offset={4}>车牌号：
                           <span style={{ marginLeft: '14px' }}>{item.licensePlate}</span>
                    </Col>
                    <Col span={8}>车辆品牌:
                        <span style={{ marginLeft: '35px' }}>{item.brand} </span>

                    </Col>
                </Row>
                <Row gutter={16} style={{ marginBottom: '15px' }}>
                    <Col span={8} offset={4}>是否新车：
                            <div style={{ display: 'inline-block', marginLeft: '5px' }}>
                            <span>{(item.newCar) ? "是" : "否"}</span>
                        </div>
                    </Col>
                    <Col span={8}>保险开始日期:
                            <DatePicker onChange={(time) => this.carInfoChange('insuranceStarttime', time, index)} style={{ marginLeft: '10px' }} placeholder={item.insuranceStarttime}
                           
                        />
                    </Col>
                </Row>
                <Row gutter={16} style={{ marginBottom: '15px' }}>
                    <Col span={8} offset={4} >车辆型号:
                        <span style={{ marginLeft: '10px' }}>{item.cartype}</span>
                    </Col>
                    <Col span={8} >保险截止日期:
                            <DatePicker onChange={(time) => this.carInfoChange('insuranceEndtime', time, index)} style={{ marginLeft: '10px' }} placeholder={item.insuranceEndtime}
            
                        />
                    </Col>
                </Row>
                <Row gutter={16} style={{ marginBottom: '15px' }}>
                    <Col span={8} offset={4}>上次里程：
                            <span style={{ marginLeft: '2px' }}>{item.lastMiles}</span>
                        {/* <Input style={{ width: '150px', marginLeft: '2px' }} value={item.lastMiles} onChange={(e) => this.onValueChange('lastMiles', e.target.value)} /> */}
                    </Col>
                    <Col span={8} >保险金额：
                        <Input style={{ width: '140px', marginLeft: '25px' }} value={item.insuranceAmount} onChange={(e) => this.carInfoChange('carInfoChange', e.target.value,index)} />
                    </Col>
                </Row>
                <Row gutter={16} style={{ marginBottom: '15px' }}>
                    <Col span={8} offset={4}>本次里程：
                        <span style={{ marginLeft: '2px' }}>{item.miles}</span>
                        {/* <Input style={{ width: '150px', marginLeft: '14px' }} value={item.miles} onChange={(e) => this.onValueChange('miles', e.target.value)} /> */}
                    </Col>
                    <Col span={8} id="licTime">上牌时间:
                         <DatePicker onChange={(time) => this.carInfoChange('licenseDate', time, index)} style={{ marginLeft: '35px' }} placeholder={item.licenseDate}
                            getCalendarContainer={() => document.getElementById('licTime')}
                        />
                    </Col>
                </Row>
                <Row gutter={16} style={{ marginBottom: '15px' }}>
                    <Col span={8} offset={4}>车架号：
                         <span style={{ marginLeft: '15px' }}>{item.frameNumber}</span>
                    </Col>
                    <Col span={8} >发动机号：
                        <span style={{ marginLeft: '25px' }}>{item.engineNumber}</span>
                    </Col>
                </Row>
            </Card>

        })
        return (
            <div>
                <BreadcrumbCustom first="会员管理" second="修改客户信息" />

                <Card title='客户信息' style={{ marginTop: '15px', marginBottom: '15px' }}>
                    <Row gutter={16} style={{ marginBottom: '15px' }}>
                        <Col span={8} offset={4}>姓名:
                            <Input style={{ width: '150px', marginLeft: '22px' }} value={this.state.form.name} onChange={(e) => this.onValueChange('name', e.target.value)} />
                        </Col>
                        <Col span={8}>年龄:
                            <Input style={{ width: '150px', marginLeft: '30px' }} value={this.state.form.age} onChange={(e) => this.onValueChange('age', e.target.value)} />
                        </Col>
                    </Row>

                    <Row gutter={16} style={{ marginBottom: '15px' }}>
                        <Col span={8} offset={4}>手机号:
                            <Input style={{ width: '150px', marginLeft: '10px' }} value={this.state.form.phone} onChange={(e) => this.onValueChange('phone', e.target.value)} />
                        </Col>
                        <Col span={8}>性别：
                            <div style={{ display: 'inline-block', marginLeft: '26px' }}>
                                <span>{this.state.form.gender}</span>
                                {/* <RadioGroup onChange={this.genderonChange} value={this.state.gender}>
                                    <Radio value={'男'}>男</Radio>
                                    <Radio value={'女'}>女</Radio>
                                </RadioGroup> */}
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: '12px' }}>
                        <Col span={8} offset={4} id="birthday"><span >生日：</span>
                             <DatePicker onChange={this.birthdayonChange} value={this.state.form.birthday} placeholder={this.state.form.birthday}
                                getCalendarContainer={() => document.getElementById('birthday')}
                            /> 

                            <span style={{ width: '150px', marginLeft: '12px' }}>{this.state.form.birthday}</span>

                        </Col>
                        <Col span={8}>身份证号:
                            <Input style={{ width: '150px', marginLeft: '12px' }} value={this.state.form.idNumber} onChange={(e) => this.onValueChange('idNumber', e.target.value)} />
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: '12px' }}>
                        <Col span={8} offset={4}>行驶证号:
                            <Input style={{ width: '150px', marginLeft: '0px' }} value={this.state.form.driverLicense} onChange={(e) => this.onValueChange('driverLicense', e.target.value)} />
                        </Col>
                        <Col span={8}>推荐人:
                            <Input style={{ width: '150px', marginLeft: '25px' }} value={this.state.form.recommendName} onChange={(e) => this.onValueChange('recommendName', e.target.value)} />
                        </Col>
                    </Row>
                </Card>
                {carsInfo}
                <div style={{ marginLeft: '37%', marginTop: '20px', }}>
                    <Button type="primary" style={{ marginRight: '50px' }} size='large' onClick={this.saveData}>
                        保存
                    </Button>
                    <Button type="primary" size='large'>
                        <Link to={'app/member/customer'}>取消</Link>
                    </Button>
                </div>
            </div>
        )
    }
}
export default ModifyClient