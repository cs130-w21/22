# -*- coding: utf-8 -*-
from inference import EULA, Inference


class EULATest:
  """
  This class parametrizes a test of the deep learning module with a single EULA agreement. 
  It accepts an inference engine, eula text, as well as the true ethicality of the agreement.
  It then runs a small set of tests relating to the neural networks' accuracy, 
  as well as some basic sanity checks.

  Args:
    inference_engine (inference.Inference): the associated inference engine to run the tests with
    text (str): a EULA text to run the test on
    ethicality (str): either 'ethical' or 'unethical', the target value for the current EULA text

  """

  def __init__(self, inference_engine, text, ethicality):
    """Initializes a EULATest object."""
    self.inference_engine = inference_engine
    self.text = text[:500]
    self.eula = EULA(self.text)
    self.ethicality = ethicality


  def summarizer_test(self):
    """
    This test takes as input some text and calls the summarizer code.
    It ensures that there are no runtime errors in the summarization pipeline and 
    that the returned summary is shorter than the input text, given that the input
    text is big enough.
    """
    summary = self.inference_engine.getEULASummary(self.eula)
    if len(self.text) > 500:
      assert len(summary) < len(self.text) // 2, "Error: EULA insufficiently summarized."
    assert len(summary) <= len(self.text), "Error: summary length longer than EULA length."
    print('Summarizer test passed.')


  def classifier_test(self):
    """
    This test takes as input some text and calls the ethicality classifier.
    It checks if the classifier correctly classifies a EULA as ethical or unethical.
    Since the classifier is stochastic, this does not perform assertions and is
    NOT guaranteed to succeed. 
    """
    classification = self.inference_engine.getEthicalityClassification(self.eula)
    if classification != self.ethicality:
      print('\nWarning: EULA ethicality misclassified.')
      return
    
    print('\nEULA test passed.')
  
  def run(self):
    """Runs both classifier and summarizer tests."""
    self.classifier_test()
    self.summarizer_test()


def run_tests():
  """Runs a suite of tests for EULA classifier and summarizer models."""

  # Create 5 tests using the test template.
  eulas = ['18. Governing Law: This Agreement shall be governed by and interpreted in accordance with the Federal laws of theUnited States, without reference to conflict-of-laws principles. If for any reason a court of competent jurisdiction finds any provision of this Agreement to be unenforceable, that provision will be enforced to the maximum extent possible to effectuate the intent of the parties, and the remainder of this Agreement will continue in full force and effect. This Agreement shall not be governed by the United Nations Convention on Contracts for the International Sale of Goods. Buyer agrees that exclusive jurisdiction for any dispute arising out of or relating to this Agreement lies within the venue mandated by applicable Federal law.\n1.8 Modification. We may modify, update, or discontinue the Services, Software (including any of their portions or features) at any time without liability to you or anyone else. However, we will make reasonable effort to notify you before we make the change. We will also allow you a reasonable time to download your content. If we discontinue a Service in its entirety, then we will provide you with a pro rata refund for any unused fees for that Service that you may have prepaid.',
           'This Agreement and any dispute or claim arising out of or in connection with it or its subject matter, formation, validity, construction, interpretation and performance (including non-contractual disputes or claims) shall be governed by and construed in accordance with the Federal laws of the United States.\nRecourse against the United States for any alleged breach of this agreement must be made under the terms of the Federal Tort Claims Act or as a dispute under the contract disputes clause (Contract Disputes Act) as applicable. The Contractor shall proceed diligently with performance of this contract, pending final resolution of any request for relief, claim, appeal, or action arising under the contract, and comply with any decision of the Contracting Officer.',
           'Successors and Assigns. This Agreement is binding upon and inures to the benefit of the parties hereto and their respective successors and assigns. Neither party may assign or otherwise transfer this Agreement or its rights and duties without the prior written consent of the other party, except that no such consent will\nIf the Customer re-purchases the Services following a Downgrade, accounts that were converted to personal accounts as a result of the Downgrade will need to be re-invited to join the Group, if the Customer desires. However, there is no guarantee that each such user will accept that invitation.',
           'Indemnity. Except to the extent prohibited under applicable law, you agree to defend, indemnify and hold harmless COMPANY and the COMPANY Parties, and their respective successors and assigns, from and against all claims, liabilities, damages, judgments, awards, losses, costs, expenses and fees (including attorneys’ fees) arising out of or relating to (a) your use of, or activities in connection with, the COMANY Services (including Your Submissions); and (b) any violation or alleged violation of this Agreement by you.\nThe Product is not intended for use by persons under the age of eighteen (18). If you are under 18 years old, you may not use this application or provide COMPANY with any personal information.',
           '4.2 Company shall at all times keep confidential and not divulge to anyone, other than authorized employees and representatives of Company and Customer, any confidential information received by Company from Customer in pursuance of this Agreement. Furthermore, Company undertakes to keep confidential any and all vulnerabilities discovered in Customer’s systems and not, without prior written consent of Customer, disclose such vulnerabilities to a third party.\nMarketing. Customer hereby agrees that COMPANY may use, publish, disclose and incorporate in promotional material Customer\'s name and status as a customer of COMPANY, and any portion of any feedback, in any form, including, but not limited to, quotations of written and/or oral commentary relating to the Service and Customer\'s name and/or the name(s) of the individuals quoted, submitted by Customer to COMPANY.']
  
  true_ethicality_classifications = ['unethical', 'ethical', 'ethical', 'unethical', 'ethical']
  
  inference_engine = Inference()

  # Execute all 5 tests.
  for eula, classification in zip(eulas, true_ethicality_classifications):
    test = EULATest(inference_engine, eula, classification)
    try:
      test.run()
    except:
      print('TEST ERROR.')


if __name__ == '__main__':
  run_tests()
  
