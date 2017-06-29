package com.geariot.platform.freelycar.service;

import java.util.ArrayList;
import java.util.Calendar;
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
import com.geariot.platform.freelycar.utils.DateJsonValueProcessor;
import com.geariot.platform.freelycar.utils.JsonResFactory;
import com.geariot.platform.freelycar.utils.query.MonthStat;

import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;

@Service
@Transactional
public class StatService {

	@Autowired
	private ExpendOrderDao expendOrderDao;

	@Autowired
	private IncomeOrderDao incomeOrderDao;

	public String getToday(int income, int expend, int page, int number) {
		Date today = new Date();
		int from = (page - 1) * number;
		if (income == 0 && expend == 1) {
			List<ExpendOrder> orders = expendOrderDao.listByDate(today);
			List<ExpendOrder> list = expendOrderDao.listByDate(today, from, number);
			if (list == null || list.isEmpty()) {
				return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
			}
			float expendStat = 0;
			if (orders == null || orders.isEmpty()) {
				expendStat = 0;
			} else {
				for (ExpendOrder expendOrder : orders) {
					expendStat = expendStat + expendOrder.getAmount();
				}
			}
			long realSize = (long) orders.size();
			JsonConfig config = new JsonConfig();
			config.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor());
			JSONArray jsonArray = JSONArray.fromObject(list, config);
			net.sf.json.JSONObject obj = JsonResFactory.buildNetWithData(RESCODE.SUCCESS, jsonArray);
			obj.put(Constants.RESPONSE_REAL_SIZE_KEY, realSize);
			obj.put("expendStat", expendStat);
			return obj.toString();
		} else if (income == 1 && expend == 0) {
			List<IncomeOrder> orders = incomeOrderDao.listByDate(today);
			List<IncomeOrder> list = incomeOrderDao.listByDate(today, from, number);
			if (list == null || list.isEmpty()) {
				return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
			}
			float incomeStat = 0;
			if (orders == null || orders.isEmpty()) {
				incomeStat = 0;
			} else {
				for (IncomeOrder incomeOrder : orders) {
					incomeStat = incomeStat + incomeOrder.getAmount();
				}
			}
			long realSize = (long) orders.size();
			JsonConfig config = new JsonConfig();
			config.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor());
			JSONArray jsonArray = JSONArray.fromObject(list, config);
			net.sf.json.JSONObject obj = JsonResFactory.buildNetWithData(RESCODE.SUCCESS, jsonArray);
			obj.put(Constants.RESPONSE_REAL_SIZE_KEY, realSize);
			obj.put("incomeStat", incomeStat);
			return obj.toString();
		} else if (income == 1 && expend == 1) {
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
		} else {
			return JsonResFactory.buildOrg(RESCODE.WRONG_PARAM).toString();
		}

	}

	public String thisMonth(int income, int expend, int page, int number) {
		Date today = new Date();
		int from = (page - 1) * number;
		if (income == 0 && expend == 1) {
			List<ExpendOrder> orders = expendOrderDao.listByMonth(today);
			List<ExpendOrder> list = expendOrderDao.listByMonth(today, from, number);
			if (list == null || list.isEmpty()) {
				return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
			}
			float expendStat = 0;
			if (orders == null || orders.isEmpty()) {
				expendStat = 0;
			} else {
				for (ExpendOrder expendOrder : orders) {
					expendStat = expendStat + expendOrder.getAmount();
				}
			}
			long realSize = (long) orders.size();
			JsonConfig config = new JsonConfig();
			config.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor());
			JSONArray jsonArray = JSONArray.fromObject(list, config);
			net.sf.json.JSONObject obj = JsonResFactory.buildNetWithData(RESCODE.SUCCESS, jsonArray);
			obj.put(Constants.RESPONSE_REAL_SIZE_KEY, realSize);
			obj.put("expendStat", expendStat);
			return obj.toString();
		} else if (income == 1 && expend == 0) {
			List<IncomeOrder> orders = incomeOrderDao.listByMonth(today);
			List<IncomeOrder> list = incomeOrderDao.listByMonth(today, from, number);
			if (list == null || list.isEmpty()) {
				return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
			}
			float incomeStat = 0;
			if (orders == null || orders.isEmpty()) {
				incomeStat = 0;
			} else {
				for (IncomeOrder incomeOrder : orders) {
					incomeStat = incomeStat + incomeOrder.getAmount();
				}
			}
			long realSize = (long) orders.size();
			JsonConfig config = new JsonConfig();
			config.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor());
			JSONArray jsonArray = JSONArray.fromObject(list, config);
			net.sf.json.JSONObject obj = JsonResFactory.buildNetWithData(RESCODE.SUCCESS, jsonArray);
			obj.put(Constants.RESPONSE_REAL_SIZE_KEY, realSize);
			obj.put("incomeStat", incomeStat);
			return obj.toString();
		} else if (income == 1 && expend == 1) {
			List<ExpendOrder> expendList = expendOrderDao.listByMonth(today);
			List<IncomeOrder> incomeList = incomeOrderDao.listByMonth(today);
			float expendStat = 0;
			if (expendList == null || expendList.isEmpty()) {
				expendStat = 0;
			} else {
				for (ExpendOrder expendOrder : expendList) {
					expendStat = expendStat + expendOrder.getAmount();
				}
			}
			float incomeStat = 0;
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
		} else {
			return JsonResFactory.buildOrg(RESCODE.WRONG_PARAM).toString();
		}

	}

	public String monthlyByYear(Date selectYear) {
		Calendar start = Calendar.getInstance();
		Calendar end = Calendar.getInstance();
		start.setTime(selectYear);
		end.setTime(selectYear);
		start.set(Calendar.MONTH, 0);
		start.set(Calendar.DAY_OF_MONTH, 1);
		end.set(Calendar.MONTH, 11);
		end.set(Calendar.DAY_OF_MONTH, 31);
		System.out.println(start.getTime());
		System.out.println(end.getTime());
		List<Object[]> rss = this.incomeOrderDao.listMonthStat(start.getTime(), end.getTime());
		List<MonthStat> list = new ArrayList<>();
		for (Object[] rs : rss) {
			list.add(new MonthStat(Double.valueOf(String.valueOf(rs[0])), Double.valueOf(String.valueOf(rs[1])),
					String.valueOf(rs[2])));
		}
		return JsonResFactory.buildNetWithData(RESCODE.SUCCESS, net.sf.json.JSONArray.fromObject(list)).toString();
	}

	public String weeklyStatDetail(int income, int expend, int page, int number) {
		int from = (page - 1) * number;
		if (income == 0 && expend == 1) {
			List<ExpendOrder> orders = expendOrderDao.listByWeek();
			List<ExpendOrder> list = expendOrderDao.listByWeek(from, number);
			if (list == null || list.isEmpty()) {
				return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
			}
			float expendStat = 0;
			if (orders == null || orders.isEmpty()) {
				expendStat = 0;
			} else {
				for (ExpendOrder expendOrder : orders) {
					expendStat = expendStat + expendOrder.getAmount();
				}
			}
			long realSize = (long) orders.size();
			JsonConfig config = new JsonConfig();
			config.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor());
			JSONArray jsonArray = JSONArray.fromObject(list, config);
			net.sf.json.JSONObject obj = JsonResFactory.buildNetWithData(RESCODE.SUCCESS, jsonArray);
			obj.put(Constants.RESPONSE_REAL_SIZE_KEY, realSize);
			obj.put("expendStat", expendStat);
			return obj.toString();
		} else if (income == 1 && expend == 0) {
			List<IncomeOrder> orders = incomeOrderDao.listByWeek();
			List<IncomeOrder> list = incomeOrderDao.listByWeek(from, number);
			if (list == null || list.isEmpty()) {
				return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
			}
			float incomeStat = 0;
			if (orders == null || orders.isEmpty()) {
				incomeStat = 0;
			} else {
				for (IncomeOrder incomeOrder : orders) {
					incomeStat = incomeStat + incomeOrder.getAmount();
				}
			}
			long realSize = (long) orders.size();
			JsonConfig config = new JsonConfig();
			config.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor());
			JSONArray jsonArray = JSONArray.fromObject(list, config);
			net.sf.json.JSONObject obj = JsonResFactory.buildNetWithData(RESCODE.SUCCESS, jsonArray);
			obj.put(Constants.RESPONSE_REAL_SIZE_KEY, realSize);
			obj.put("incomeStat", incomeStat);
			return obj.toString();
		} else {
			return JsonResFactory.buildOrg(RESCODE.WRONG_PARAM).toString();
		}

	}
}
