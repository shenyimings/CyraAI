"use client";
import { useManageStore } from './store'
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"

import { JobDialog } from "./dialog";
  
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

// Mock data
const jobListings = [
    { id: 1, title: "区块链安全研究员", status: "Active", applications: 2 },
    { id: 2, title: "Blockchain Engineer", status: "Closed", applications: 8 },
    { id: 3, title: "Product Manager", status: "Closed", applications: 24 },
];

const candidates = [
    { id: 1, name: "John Doe", role: "Frontend Developer", status: "Interviewing" },
    { id: 2, name: "Jane Smith", role: "Blockchain Engineer", status: "Pending" },
];

export default function ManagePage() {
    const { activeSection } = useManageStore()

    return (
        <div className="space-y-6">
            {activeSection === "jobs" && (
            <Card className=''>
                <CardHeader className="flex flex-row items-center gap-4">
                <CardTitle>Active Job Listings</CardTitle>
                    <JobDialog></JobDialog>
                </CardHeader>
                <CardContent>
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Applications</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {jobListings.map((job) => (
                        <TableRow key={job.id}>
                            <TableCell>{job.title}</TableCell>
                            <TableCell>{job.status}</TableCell>
                            <TableCell>{job.applications}</TableCell>
                            <TableCell>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" size="sm">View</Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80">
                                        <div className="space-y-2">
                                            <h4 className="font-medium">{job.title}</h4>
                                            <Separator />
                                            <div className="text-sm">
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="font-medium">Company:</div>
                                                    <div>InPlusLab</div>
                                                    <div className="font-medium">Website:</div>
                                                    <div>https://inpluslab.com</div>
                                                    <div className="font-medium">Head Count:</div>
                                                    <div>2</div>
                                                    <div className="font-medium">Description:</div>
                                                </div>
                                                <p className="mt-2">🚀【高薪诚聘】区块链安全研究员（2名）🚀 <br/>
🔍 **核心职责**：  <br/>
- 深度参与区块链底层协议及智能合约安全研究，主导前沿漏洞挖掘与攻防技术突破 <br/> 
- 执行系统性代码审计（涵盖Solidity/Vyper智能合约及节点客户端代码），输出企业级安全评估报告  <br/>
- 构建自动化安全检测工具链，提升Web3安全防御体系效能  <br/>

💎 **硬性要求**：  <br/>
- 编程能力：精通Golang/Rust（优先）或C++/Python，具备反编译/逆向工程经验者加分  
- 区块链理解：深入掌握EVM原理、共识机制、zk-Rollup等扩容方案，有DeFi闪电贷攻击/MEV分析实战经验  
- 专业资质：曾独立发现Critical级漏洞（附CVE编号）或获得过Immunefi漏洞赏金者优先  
- 语言能力：可熟练撰写英文安全公告（PoC标准格式）及技术文档  

🌐 **加分项**：  <br/>
- 发表过区块链安全顶会论文（如IEEE S&P, USENIX Security）  
- 具备知名审计机构工作经验  
- 持有OSCP/OSEE等渗透测试认证  

📮 **申请方式**：  <br/>
通过专属安全通道提交简历+技术成果集：  
👉 https://t.me/CyraAI_web3_bot?start=W3001

💡 我们提供：  <br/>
- 行业TOP 1%薪酬包（含Token激励）  
- 零距离接触百亿级TVL协议核心审计  
- 定期与BlockSec/SlowMist专家技术研讨  </p>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </CardContent>
            </Card>
            )}

            {activeSection === "candidates" && (
            <Card>
                <CardHeader>
                <CardTitle>Candidate Pool</CardTitle>
                </CardHeader>
                <CardContent>
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {candidates.map((candidate) => (
                        <TableRow key={candidate.id}>
                            <TableCell>{candidate.name}</TableCell>
                            <TableCell>{candidate.role}</TableCell>
                            <TableCell>{candidate.status}</TableCell>
                            <TableCell>
                                <Button variant="outline" size="sm">Profile</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </CardContent>
            </Card>
            )}
        </div>
    );
}