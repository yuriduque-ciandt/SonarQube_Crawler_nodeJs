const successIcon = process.env.SLACK_ICON_SUCCESS;
const errorIcon = process.env.SLACK_ICON_ERROR;
const noValueIcon = process.env.SLACK_ICON_NO_VALUE;

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
  if (body.branch && body.branch.type == "SHORT") {
    message = setPullRequestDerails(body, message);
  } else {
    message = setBranchDetails(body, message);
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

function setPullRequestDerails(body, message) {
  const prNumber = body.branch.name.replace("PR-", "");
  const pullRequestUrl = `${process.env.GITHUB_URL}/${body.project.name}/pull/${prNumber}`;

  const section1 = {
    type: "section",
    fields: [
      {
        type: "mrkdwn",
        text: `*Analysis:*\n<${body.branch.url}|Analysis link>`,
      },
      {
        type: "mrkdwn",
        text: `*Pull Request:*\n<${pullRequestUrl}|Pull request link>`,
      },
    ],
  };

  message.blocks.push(section1);
  return message;
}

function setBranchDetails(body, message) {
  const branchUrl = `${process.env.GITHUB_URL}/${body.project.name}/tree/${body.branch.name}`;
  const section1 = {
    type: "section",
    fields: [
      {
        type: "mrkdwn",
        text: `*Analysis:*\n<${body.branch.url}|Analysis link>`,
      },
      {
        type: "mrkdwn",
        text: `*Branch:*\n<${branchUrl}|Branch link>`,
      },
    ],
  };
  message.blocks.push(section1);
  return message;
}

function setConditions(body, message) {
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
