function buildMessage(body) {
  let message = { blocks: [] };

  message = setMessageHeader(body, message);

  message = setDetails(body, message);

  message = setConditions(body, message);

  return message;
}

function setMessageHeader(body, message) {
  const header = {
    type: "header",
    text: {
      type: "plain_text",
      text: `${body.project.name}: ${
        body.status == "SUCCESS" ? successIcon : errorIcon
      }`,
      emoji: true,
    },
  };
  const description = {
    type: "context",
    elements: [
      {
        type: "mrkdwn",
        text: `The analysis for project '${body.project.name}' failed`,
      },
    ],
  };

  message.blocks.push(header);
  message.blocks.push(description);
  message = setDiver(message);
  return message;
}

function setDetails(body, message) {
  const test = "";
  test.includes();
  if (body.branch && body.branch.name.includes("PR")) {
    const prNumber = body.branch.name.replace("PR-", "");
    const section1 = {
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: `*Analysis:*\n<${body.branch.url}|Analysis link>`,
        },
        {
          type: "mrkdwn",
          text: `*Pull Request:*\n<https://github.com/ab-inbev-global-martech/Tapit-BE-USA-Custom/pull/${prNumber}|Pull request link>`,
        },
      ],
    };

    message.blocks.push(section1);
  }

  const date = body.analysedAt.split("+")[0];
  const section2 = {
    type: "section",
    fields: [
      {
        type: "mrkdwn",
        text: `*When:*\n${date}`,
      },
      {
        type: "mrkdwn",
        text: `*Quality gate name:*\n${body.qualityGate.name}`,
      },
    ],
  };

  message.blocks.push(section2);
  message = setDiver(message);
  return message;
}

function setConditions(body, message) {
  const successIcon = ":white_check_mark:";
  const errorIcon = ":x:";
  const noValueIcon = ":heavy_minus_sign:";

  let conditions = {
    type: "section",
    fields: [],
  };

  body.qualityGate.conditions.forEach((condition) => {
    if (conditions.fields.length == 2) {
      message.blocks.push(conditions);
      conditions = {
        type: "section",
        fields: [],
      };
    }

    const newCondition = {
      type: "mrkdwn",
      text: "",
    };

    newCondition.text += `*${condition.metric}:* `;

    let icon;
    if (condition.status == "OK") {
      icon = successIcon;
    } else if (condition.status == "NO_VALUE") {
      icon = noValueIcon;
    } else {
      icon = errorIcon;
    }

    newCondition.text += icon + "\n";

    newCondition.text += `operator: ${condition.operator}\n`;
    newCondition.text += `expected: ${condition.errorThreshold}\n`;
    newCondition.text += `actual: ${condition.value} \n`;

    conditions.fields.push(newCondition);
  });

  message.blocks.push(conditions);
  message = setDiver(message);
  return message;
}

function setDiver(message) {
  const diver = {
    type: "divider",
  };
  message.blocks.push(diver);
  return message;
}

export default buildMessage;
