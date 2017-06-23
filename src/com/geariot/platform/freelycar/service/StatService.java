package com.geariot.platform.freelycar.service;


import java.util.Date;
import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.geariot.platform.freelycar.dao.ExpendOrderDao;
import com.geariot.platform.freelycar.dao.IncomeOrderDao;
import com.geariot.platform.freelycar.entities.ExpendOrder;
import com.geariot.platform.freelycar.entities.IncomeOrder;
import com.geariot.platform.freelycar.model.RESCODE;
import com.geariot.platform.freelycar.utils.Constants;
import com.geariot.platform.freelycar.utils.JsonResFactory;

import net.sf.json.JSONArray;

@Service
@Transactional
public class StatService {

	@Autowired
	private ExpendOrderDao expendOrderDao;
	
	@Autowired
	private IncomeOrderDao incomeOrderDao;
	
	public String getToday(Date today, int income, int expend) {
		if (income == 0 && expend == 1) {
			List<ExpendOrder> list = expendOrderDao.listByDate(today);
			if (list == null || list.isEmpty()) {
				return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
			}
			long size = (long) list.size();
			JSONArray jsonArray = JSONArray.fromObject(list);
			net.sf.json.JSONObject obj = JsonResFactory.buildNetWithData(RESCODE.SUCCESS, jsonArray);
			obj.put(Constants.RESPONSE_SIZE_KEY, size);
			return obj.toString();
		}
		else if(income == 1 && expend ==0 ){
			List<IncomeOrder> list = incomeOrderDao.listByDate(today);
			if (list == null || list.isEmpty()) {
				return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
			}
			long size = (long) list.size();
			JSONArray jsonArray = JSONArray.fromObject(list);
			net.sf.json.JSONObject obj = JsonResFactory.buildNetWithData(RESCODE.SUCCESS, jsonArray);
			obj.put(Constants.RESPONSE_SIZE_KEY, size);
			return obj.toString();
		}
		else if(income ==1 && expend ==1){
			List<ExpendOrder> expendList = expendOrderDao.listByDate(today);
			List<IncomeOrder> incomeList = incomeOrderDao.listByDate(today);
			float incomeStat = 0;
			float expendStat = 0;
			if (expendList == null || expendList.isEmpty()) {
				expendStat = 0;
			} else {
				for (ExpendOrder expendOrder : expendList) {
					expendStat = expendStat + expendOrder.getAmount();
				}
			}
			if (incomeList == null || incomeList.isEmpty()) {
				incomeStat = 0;
			} else {
				for (IncomeOrder incomeOrder : incomeList) {
					incomeStat = incomeStat + incomeOrder.getAmount();
				}
			}
			JSONObject obj = JsonResFactory.buildOrg(RESCODE.SUCCESS);
			obj.put("incomeStat", incomeStat);
			obj.put("expendStat", expendStat);
			return obj.toString();
		}
		else{
			return JsonResFactory.buildOrg(RESCODE.WRONG_PARAM).toString();
		}
		
	}
	
	public String thisMonth(Date today , int income , int expend){
		if (income == 0 && expend == 1) {
			List<ExpendOrder> list = expendOrderDao.listByMonth(today);
			if (list == null || list.isEmpty()) {
				return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
			}
			long size = (long) list.size();
			JSONArray jsonArray = JSONArray.fromObject(list);
			net.sf.json.JSONObject obj = JsonResFactory.buildNetWithData(RESCODE.SUCCESS, jsonArray);
			obj.put(Constants.RESPONSE_SIZE_KEY, size);
			return obj.toString();
		} else if (income == 1 && expend == 0) {
			List<IncomeOrder> list = incomeOrderDao.listByMonth(today);
			if (list == null || list.isEmpty()) {
				return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
			}
			long size = (long) list.size();
			JSONArray jsonArray = JSONArray.fromObject(list);
			net.sf.json.JSONObject obj = JsonResFactory.buildNetWithData(RESCODE.SUCCESS, jsonArray);
			obj.put(Constants.RESPONSE_SIZE_KEY, size);
			return obj.toString();
		}else if(income==1 && expend ==1){
			List<ExpendOrder> expendList = expendOrderDao.listByMonth(today);
			List<IncomeOrder> incomeList = incomeOrderDao.listByMonth(today);
			float incomeStat = 0;
			float expendStat = 0;
			if (expendList == null || expendList.isEmpty()) {
				expendStat = 0;
			} else {
				for (ExpendOrder expendOrder : expendList) {
					expendStat = expendStat + expendOrder.getAmount();
				}
			}
			if (incomeList == null || incomeList.isEmpty()) {
				incomeStat = 0;
			} else {
				for (IncomeOrder incomeOrder : incomeList) {
					incomeStat = incomeStat + incomeOrder.getAmount();
				}
			}
			JSONObject obj = JsonResFactory.buildOrg(RESCODE.SUCCESS);
			obj.put("incomeStat", incomeStat);
			obj.put("expendStat", expendStat);
			return obj.toString();
		}else {
			return JsonResFactory.buildOrg(RESCODE.WRONG_PARAM).toString();
		}
		
	}
	
	
}