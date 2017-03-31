from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

browser = webdriver.Chrome("C:/Code/Tools/chromedriver.exe")
browser.get('https://sbswebapp.azurewebsites.net/TasksV2?filterId=124950')

#----------------------LogIn part -Begin- -------------
element = WebDriverWait(browser, 60).until(EC.presence_of_element_located((By.NAME, 'passwd')))
element = browser.find_element_by_name("login")
element.clear()
element.send_keys("hengyliu@microsoft.com")
element = browser.find_element_by_name("passwd")
element.clear()
element.send_keys("lhy_71171111111")

element = WebDriverWait(browser, 60).until(EC.presence_of_element_located((By.XPATH, '//*[@id="loginMessage"]/a')))
element.click()

element = WebDriverWait(browser, 60).until(EC.presence_of_element_located((By.XPATH, '//*[@id="submitButton"]')))
browser.find_element_by_name("Password").send_keys("lhy_71171111111")
browser.find_element_by_xpath('//*[@id="submitButton"]').click()
time.sleep(20)
#--------------------LogIn part -End--------------------

#--------------------Decode query engine info -Begin--------------------
fw = open("C:/Code/data/judgmentsQueryInfo.tsv", 'w', encoding='utf-8')
fw.write("TaskId\tQuery\tJudgeInfo\n")
for i in range(2):
    if i > 0:
        nextPage_node = WebDriverWait(browser, 50).until(EC.element_to_be_clickable((By.XPATH,'//*[@id="tasklist"]/div[3]/div/span[4]/button')))
        nextPage_node.click() #not need to switch to latest window handle as no new window handle opened

    experiments = WebDriverWait(browser, 50).until(lambda browser: browser.find_elements_by_xpath('//div/table/tbody[@data-bind="foreach: PagedQuery"]/tr'))
    main_window = browser.current_window_handle #window handle that display experiments list
    exp_num = 0
    #---loop between submitted experiments----
    for experiment in experiments:
        exp_num += 1
        exp_score_node = experiment.find_element_by_xpath('./td[@data-bind="text: UnweightedTotalScore, attr: {class:  getWinLossClass(IsStatSig(), UnweightedTotalScore())}"]') #find specified experiment score to filter NAN job
        if exp_score_node.text == "NaN":
            continue
        exp_link_node = experiment.find_element_by_xpath('./td/a[@data-bind="attr: {href: UrlToTask(DbID())}, text: TaskName"]') #find the link node to detail information about this experiment
        exp_link_node.click()

        browser.switch_to.window(browser.window_handles[-1]) #new tab window opened
        exp_window_handle = browser.window_handles[-1] #switch to latest opened tab window

        #extract group and task id
        link_toTaskIdPage_node = WebDriverWait(browser, 120).until(EC.element_to_be_clickable((By.XPATH, '//table[@class="table tableSortable"]/tbody/tr/td[@style="max-width:400px;"]/a[@href]')))
        link_toTaskIdPage_node.click() #stay the window handler to extract QueryView information

        browser.switch_to.window(browser.window_handles[-1])
        taskId_node = WebDriverWait(browser, 60).until(lambda browser : browser.find_element_by_xpath('//div[@class="page-header-shortcuts"]/div[@class="tertiary-text"]'))
        taskId = taskId_node.text
        browser.close()
        browser.switch_to.window(exp_window_handle) #switch to QueryView webpage

        #extract query information
        queryView_button_node = browser.find_element_by_link_text('Query View')
        queryView_button_node.click()
        queries_judges_link_nodes = WebDriverWait(browser, 60).until(lambda browser : browser.find_elements_by_xpath('//*[@id="hitList"]/div[2]/table/tbody/tr'))
        query_pageNum_node = browser.find_element_by_xpath('//span/button/span[@data-bind="text: PagesTotal"]')
        page_num = int(query_pageNum_node.text)
        for j in range(page_num):
            if j > 0:
                query_next_page_node = browser.find_element_by_xpath('//*[@id="hitList"]/div[2]/div[2]/div/span[4]/button').click()
                queries_judges_link_nodes = WebDriverWait(browser, 60).until(lambda browser : browser.find_elements_by_xpath('//*[@id="hitList"]/div[2]/table/tbody/tr'))
            #---- loop between queries that belong to same specified experiment
            for query_node in queries_judges_link_nodes:
                query_info_node = query_node.find_element_by_xpath('./td/a[@data-bind="text: QueryText, attr: {href: HitUrl()}"]') #elment that contains query and it's link
                query = query_info_node.text
                query_info_node.click() #
                browser.switch_to.window(browser.window_handles[-1]) #switch to specifed query information webpage
                google_bing_label_nodes = WebDriverWait(browser, 60).until( lambda webdriver:webdriver.find_elements_by_xpath('//*[@id="RightPane"]/table/tbody/tr/td/span[@style="color: red; font-weight: 700; font-size: x-large;"]'))
                left_node_label = google_bing_label_nodes[0].text
                right_node_lable = google_bing_label_nodes[-1].text
                res = "left:" + left_node_label.lower() + ", " + "right:" + right_node_lable.lower()
                print("{2}\t{0}\t{1}".format(query, res, taskId))
                fw.write("{2}\t{0}\t{1}\n".format(query, res, taskId))
                browser.close()
                browser.switch_to.window(exp_window_handle) #swithc to specified window that contains query list
        print("\n\nExp finished {0}\n\n".format(exp_num))
        browser.close()
        browser.switch_to.window(main_window)
    #--------------------Decode query engine info -End- -------------------
    browser.close()
fw.close()
