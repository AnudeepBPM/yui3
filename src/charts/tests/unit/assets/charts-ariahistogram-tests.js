YUI.add('charts-ariahistogram-tests', function(Y) {
    var suite = new Y.Test.Suite("Charts: AriaHistogram"),
        myDataValues = [ 
            {category:"5/1/2010", values:2000, expenses:3700, revenue:2200}, 
            {category:"5/2/2010", values:50, expenses:9100, revenue:100}, 
            {category:"5/3/2010", values:400, expenses:1100, revenue:1500}, 
            {category:"5/4/2010", values:200, expenses:1900, revenue:2800}, 
            {category:"5/5/2010", values:5000, expenses:5000, revenue:2650}
        ],
        pieDataValues = [
            {category:"5/1/2010", revenue:2200}, 
            {category:"5/2/2010", revenue:100}, 
            {category:"5/3/2010", revenue:1500}, 
            {category:"5/4/2010", revenue:2800}, 
            {category:"5/5/2010", revenue:2650}
        ],
        defaultAriaDescription = "Use the up and down keys to navigate between series. Use the left and right keys to navigate through items in a series.",
        defaultPieAriaDescription = "Use the left and right keys to navigate through items.",
        seriesKeys = ["values", "revenue"],
        width = 400,
        height = 300;

    function AriaTests(cfg, testConfig)
    {
        AriaTests.superclass.constructor.apply(this);
        this.attrConfig = cfg;
        this.name = testConfig.type + " Aria Tests";
        this.defaultAriaDescription = testConfig.defaultAriaDescription;;
    }
    Y.extend(AriaTests, Y.Test.Case, {
        defaultAriaLabel: "Chart Application",

        changedAriaLabel: "This is a new ariaLabel value.",

        setUp: function() {
            Y.one("body").append('<div id="testbed"></div>');
            Y.one("#testbed").setContent('<div style="position:absolute;top:0px;left:0px;width:500px;height:400px" id="mychart"></div>');
            var mychart = new Y.Chart(this.attrConfig);
            this.chart = mychart;
        },
        
        tearDown: function() {
            this.chart.destroy();
            Y.one("#testbed").destroy(true);
        },
        
        "test:getAriaLabel()": function()
        {
            Y.Assert.isTrue(this.chart.get("ariaLabel") == this.defaultAriaLabel);
        },

        "test:setAriaLabel()": function()
        {
            var chart = this.chart;
            chart.set("ariaLabel", this.changedAriaLabel);
            Y.Assert.isTrue(chart.get("ariaLabel") == this.changedAriaLabel);
        },

        "test:getAriaDescription()": function()
        {
            Y.Assert.isTrue(this.chart.get("ariaDescription") == this.defaultAriaDescription);
        },
        
        "test:setAriaDescription()": function()
        {
            var chart = this.chart;
            chart.set("ariaDescription", this.changedAriaLabel);
            Y.Assert.isTrue(chart.get("ariaDescription") == this.changedAriaLabel);
        }
    });
    Y.AriaTests = AriaTests;
    
    var columnTests = new Y.AriaTests({
        dataProvider: myDataValues,
        render: "#mychart",
        type: "column",
        width: width,
        height: height
    }, {
        type: "Column",
        defaultAriaDescription: defaultAriaDescription
    }),
    stackedColumnTests = new Y.AriaTests({
        dataProvider: myDataValues,
        render: "#mychart",
        type: "column",
        stacked: true,
        width: width,
        height: height
    }, {
        type: "StackedColumn",
        defaultAriaDescription: defaultAriaDescription
    }),
    barTests = new Y.AriaTests({
        dataProvider: myDataValues,
        render: "#mychart",
        type: "bar",
        width: width,
        height: height
    }, {
        type: "Bar",
        defaultAriaDescription: defaultAriaDescription
    }),
    stackedBarTests = new Y.AriaTests({
        dataProvider: myDataValues,
        render: "#mychart",
        type: "bar",
        stacked: true,
        width: width,
        height: height
    }, {
        type: "StackedBar",
        defaultAriaDescription: defaultAriaDescription
    });

    suite.add(columnTests);
    suite.add(stackedColumnTests);
    suite.add(barTests);
    suite.add(stackedBarTests);

    Y.Test.Runner.add(suite);
}, '@VERSION@' ,{requires:['charts', 'test']});
